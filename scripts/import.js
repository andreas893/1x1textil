import fs from "fs"
import csv from "csv-parser"
import { createClient } from "@supabase/supabase-js"
import slugify from "slugify"

const supabase = createClient(
  "https://vyljehnlnqdsagpzpfbr.supabase.co",
  "sb_publishable_WubtwKot920KCj7Y9YOp-g_9v1owSSR"
)

const CATEGORY_PARENT_MAP = {
  Kopper: "Keramik",
  Tallerkener: "Keramik",
  Skåle: "Keramik",
  Fad: "Keramik",
  Fade: "Keramik",
  Vaser: "Keramik",
  Kander: "Keramik",
  Urtepotter: "Keramik",
  Lågkrukker: "Keramik",

  Øreringe: "Smykker",
  Halskæder: "Smykker",
  Armbånd: "Smykker",

  Glas: "Bolig & Interiør",
  Opbevaring: "Bolig & Interiør",
  Lysestager: "Bolig & Interiør",
  Flag: "Bolig & Interiør",
  Figurer: "Bolig & Interiør",
  Ophæng: "Bolig & Interiør",

  Tasker: "Accessories",
  Tørklæder: "Accessories",

  Boligtekstiler: "Tekstil",

  Bøger: "Bøger & DIY",
  Magasiner: "Bøger & DIY",
  DIY: "Bøger & DIY",

  Kort: "Papir & Prints",
  Prints: "Papir & Prints"
}

const CATEGORY_SYNONYMS = {

  // ---------- KERAMIK ----------
  kop: "Kopper",
  kopper: "Kopper",
  keramikkopper: "Kopper",
  "keramik kopper": "Kopper",
  krus: "Kopper",

  tallerken: "Tallerkener",
  tallerkener: "Tallerkener",
  keramiktallerkener: "Tallerkener",

  skål: "Skåle",
  skåle: "Skåle",
  keramikskåle: "Skåle",

  fad: "Fade",
  fade: "Fade",
  keramikfad: "Fade",

  vase: "Vaser",
  vaser: "Vaser",
  keramikvaser: "Vaser",

  kande: "Kander",
  kander: "Kander",

  urtepotte: "Urtepotter",
  urtepotter: "Urtepotter",

  lågkrukke: "Lågkrukker",
  lågkrukker: "Lågkrukker",

  // ---------- SMYKKER ----------
  ørering: "Øreringe",
  øreringe: "Øreringe",

  halskæde: "Halskæder",
  halskæder: "Halskæder",

  armbånd: "Armbånd",

  // ---------- BOLIG ----------
  glas: "Glas",

  opbevaring: "Opbevaring",
  opbevaringsglas: "Opbevaring",

  lysestage: "Lysestager",
  lysestager: "Lysestager",

  flag: "Flag",
  flagdekoration: "Flag",

  figur: "Figurer",
  figurer: "Figurer",

  ophæng: "Ophæng",
  vægophæng: "Ophæng",

  // ---------- ACCESSORIES ----------
  taske: "Tasker",
  tasker: "Tasker",

  tørklæde: "Tørklæder",
  tørklæder: "Tørklæder",

  // ---------- TEKSTIL ----------
  boligtekstil: "Boligtekstiler",
  boligtekstiler: "Boligtekstiler",
  tekstil: "Boligtekstiler",
  tekstiler: "Boligtekstiler",

  // ---------- BØGER ----------
  bog: "Bøger",
  bøger: "Bøger",

  magasin: "Magasiner",
  magasiner: "Magasiner",

  diy: "DIY",

  // ---------- PRINT ----------
  kort: "Kort",
  korter: "Kort",

  print: "Prints",
  prints: "Prints"
}

const MAIN_CATEGORIES = [
  "Keramik",
  "Smykker",
  "Bolig & Interiør",
  "Accessories",
  "Tekstil",
  "Bøger & DIY",
  "Papir & Prints"
]

//  KUN disse er tilladt
const VALID_CATEGORIES = new Set([
  ...MAIN_CATEGORIES,
  ...Object.keys(CATEGORY_PARENT_MAP)
])

function makeSlug(value) {
  return slugify(value, {
    lower: true,
    strict: true,
    locale: "da"
  })
}

function unique(arr) {
  return [...new Set(arr)]
}


// PARSE (SIMPEL OG STABIL)

function parseWooCategories(rawCategories, title) {
  const items = rawCategories
    .split(",")
    .map(i => i.trim())
    .filter(Boolean)

  let artistName = null
  const categoryNames = []

  for (const item of items) {
    const parts = item.split(">").map(p => p.trim())

    // FIND ARTIST
    if (parts[0] === "Kunsthåndværkere" && parts.length >= 2) {
      artistName = parts[1]
      continue
    }

    // KATEGORIER
    for (const part of parts) {

      const cleaned = part
        .toLowerCase()
        .replace(/[-]/g, " ")
        .trim()

      const normalized =
        CATEGORY_SYNONYMS[cleaned] || part

      if (VALID_CATEGORIES.has(normalized)) {
        categoryNames.push(normalized)

        const parent = CATEGORY_PARENT_MAP[normalized]
        if (parent) categoryNames.push(parent)
      }
    }
  }

  // fallback
  if (!artistName && title.includes(" - ")) {
    artistName = title.split(" - ")[0].trim()
  }

  return {
    artistName,
    categoryNames: unique(categoryNames)
  }
}


// ARTIST

async function getOrCreateArtist(name) {
  const slug = makeSlug(name)

  const { data, error } = await supabase
    .from("artists")
    .upsert({ name, slug }, { onConflict: "slug" })
    .select()

  if (error) {
    console.log("Artist error:", error)
    return null
  }

  return data?.[0] || null
}


// CATEGORY (LOOKUP ONLY)

async function getCategoryByName(name) {
  const slug = makeSlug(name)

  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single()

  return data || null
}


// IMPORT

async function importFile(filePath) {
  const rows = []

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", row => rows.push(row))
      .on("error", reject)
      .on("end", async () => {

        for (const row of rows) {
          const title = row.Name
          const price = parseInt(row.Regular_price || 0)
          const image = row.Images?.split(",")[0]?.trim()
          const rawCategories = row.Categories
          const rawDescription = row.Description || ""
          const description = rawDescription
          .replace(/<a[^>]*>(.*?)<\/a>/g, "$1")
          .replace(/<[^>]*>/g, "")
          .replace(/\r\n/g, "\n")
          .trim()

          if (!title || !rawCategories) continue

          const { artistName, categoryNames } =
            parseWooCategories(rawCategories, title)

          if (!artistName) continue

          const artist = await getOrCreateArtist(artistName)
          if (!artist) continue

          //  FILTRÉR KATEGORIER
          const validCategories = []

          for (const name of categoryNames) {
            const cat = await getCategoryByName(name)
            if (cat) validCategories.push(cat)
          }

          //  skip hvis ingen gyldige kategorier
          if (validCategories.length === 0) {
            console.log("Skipping product (no valid category):", title)
            continue
          }

          //  product
          const { data, error } = await supabase
            .from("products")
            .insert({
              title,
              price,
              image,
              description,
              artist_id: artist.id
            })
            .select()

          if (error) {
            console.log("Product error:", error)
            continue
          }

          const product = data?.[0]
          if (!product) continue

          //  relations
          for (const cat of validCategories) {
            await supabase
              .from("product_categories")
              .upsert({
                product_id: product.id,
                category_id: cat.id
              })
          }
        }

        resolve()
      })
  })
}

// RUN
await importFile("./data/file13-clean.csv")

console.log("Import færdig ✅")
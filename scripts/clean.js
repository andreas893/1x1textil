import fs from "fs"
import csv from "csv-parser"
import { createObjectCsvWriter } from "csv-writer"

const INPUT_FILES = [
  "./data/file13.csv"
]

const MAX_PRODUCTS = 30

for (const file of INPUT_FILES) {
  const rows = []

  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (row) => {
      // behold kun nødvendige felter
      rows.push({
        Name: row.Name,
        Regular_price: row["Regular price"],
        Images: row.Images,
        Categories: row.Categories,
        Description: row.Description
      })
    })
    .on("end", async () => {
      //  fjern tomme
      let clean = rows.filter(r => r.Name && r.Categories)

      //  fjern dubletter (baseret på navn)
      const seen = new Set()
      clean = clean.filter(r => {
        if (seen.has(r.Name)) return false
        seen.add(r.Name)
        return true
      })

      //  begræns til max 30
      clean = clean.slice(0, MAX_PRODUCTS)

      //  fix kategori spacing
      clean = clean.map(r => ({
        ...r,
        Categories: r.Categories
          ?.split(",")
          .map(c => c.trim())
          .join(", ")
      }))

      //  output fil
      const output = file.replace(".csv", "-clean.csv")

      const writer = createObjectCsvWriter({
        path: output,
        header: [
          { id: "Name", title: "Name" },
          { id: "Regular_price", title: "Regular_price" },
          { id: "Images", title: "Images" },
          { id: "Categories", title: "Categories" },
          { id: "Description", title: "Description" }
        ]
      })

      await writer.writeRecords(clean)

      console.log(`Clean file created: ${output}`)
    })
}
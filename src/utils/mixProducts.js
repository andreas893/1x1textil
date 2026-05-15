export function mixProducts({
  products = [],
  limit = 6,
  groupBy = "artist_id",
  excludeIds = [],
}) {
  if (!products.length) return []

  // fjern duplicates
  let unique = [
    ...new Map(products.map(p => [p.id, p])).values()
  ]

  // filtrer exclude
  if (excludeIds.length) {
    const excludeSet = new Set(excludeIds)
    unique = unique.filter(p => !excludeSet.has(p.id))
  }

  // group
  const grouped = {}
  for (const p of unique) {
    const key = p[groupBy] || "unknown"
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(p)
  }

  // shuffle inden for grupper (vigtigt)
  Object.keys(grouped).forEach(key => {
    grouped[key] = shuffleArray(grouped[key])
  })

  // mix (round robin)
  const mixed = []
  let added = true

  while (added && mixed.length < limit) {
    added = false

    for (const key in grouped) {
      if (grouped[key].length > 0 && mixed.length < limit) {
        mixed.push(grouped[key].shift())
        added = true
      }
    }
  }

  return mixed
}

// simpel shuffle
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
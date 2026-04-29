import React from 'react'

function CategoryHero({ category }) {
  return (
    <section className="grid grid-cols-2 gap-8">
      <div>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </div>
      <img src="/placeholder.jpg" />
    </section>
  )
}

export default CategoryHero
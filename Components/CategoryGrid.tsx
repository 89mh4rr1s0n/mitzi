import React from 'react'
import CategoryCard from './CategoryCard'

type Props = {
  title: string,
  categories: string[],
  products
}

const CategoryGrid = ({ title, categories, products }: Props) => {
  return (
    <div className='m-5 pb-5 bg-theme-blue rounded-lg'>
      <div className='mx-3 my-2 text-white'>{title}</div>
      <div className='grid grid-cols-4'>
        {categories.map((category, i) => (
          <CategoryCard
            key={i}
            images={products.filter(i=>i.category === category).map(i=>i.thumbnail).slice(0, 4)}
            categoryName={category}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryGrid
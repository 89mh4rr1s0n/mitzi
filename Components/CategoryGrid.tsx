import React from 'react'
import CategoryCard from './CategoryCard'

type Props = {
  title: string,
  categories: string[],
  products
}

const CategoryGrid = ({ title, categories, products }: Props) => {
  return (
      <div className='m-10'>
        <div className='pt-2 bg-slate-300 rounded-lg max-w-[1800px] m-auto'>
          <div className='text-white bg-theme-red rounded-md w-fit px-4 ml-3 mb-2'>{title}</div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {categories.map((category, i) => (
              <CategoryCard
                key={i}
                images={products.filter(i=>i.category === category).map(i=>i.thumbnail).slice(0, 4)}
                categoryName={category}
              />
            ))}
          </div>
        </div>
      </div>
  )
}

export default CategoryGrid
import React from 'react'
import CategoryCard from './CategoryCard'
import { Product } from '../typings'

type Props = {
  title: string,
  categories: string[],
  products: Product[]
}

const CategoryGrid = ({ title, categories, products }: Props) => {
  return (
    <div className='mb:m-10'>
      <div className='pt-8 mb:pt-2 bg-slate-300 mb:rounded-lg max-w-[1800px] m-auto'>
        <div className='text-white bg-theme-red rounded-md w-fit px-4 ml-3 mb-2'>{title}</div>
        <div className='grid grid-cols-1 mb:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {categories.map((category, i) => (
            <CategoryCard
              key={i}
              images={products.filter((i: { category: string }) => i.category === category).map((i: { thumbnail: string }) => i.thumbnail).slice(0, 4)}
              categoryName={category}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryGrid
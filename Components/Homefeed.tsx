import React from 'react'
import SmallProductCard from './SmallProductCard'

type Props = {
    title:string,
    products
}

const Homefeed = ({ products, title }: Props) => {
  return (
    <div className='m-5 pb-5 bg-theme-blue rounded-lg overflow-x-scroll scrollbar-thin scrollbar-thumb-theme-red'>
        <div className='mx-3 my-2 text-white'>{title}</div>
        <div className='flex'>
            {products.map((product) => (
                <SmallProductCard 
                key={product.id}
                description={product.description}
                thumbnail={product.thumbnail}
                discount={product.discountPercentage}
                rating={product.rating}
                />
            ))}
        </div>
    </div>
  )
}

export default Homefeed
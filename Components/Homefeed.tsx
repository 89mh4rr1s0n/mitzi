import React from 'react'
import SmallProductCard from './SmallProductCard'

type Props = {
    title:string,
    products
}

const Homefeed = ({ products, title }: Props) => {
  return (
    <div className='mx-10 z-40'>
      <div className='my-5 pb-5 bg-slate-400 max-w-[1800px] m-auto rounded-lg overflow-x-scroll scrollbar-thin scrollbar-thumb-theme-red'>
          <div className='mx-3 my-2 text-white relative bg-theme-red rounded-md w-fit px-4'>{title}</div>
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
    </div>
  )
}

export default Homefeed
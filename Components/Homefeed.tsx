import React, { useState, useRef, useEffect } from 'react'
import SmallProductCard from './SmallProductCard'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

type Props = {
  title: string,
  products
}

const Homefeed = ({ products, title }: Props) => {

  const [arrowsVisible, setArrowsVisible] = useState(false)

  return (
    <div className='mx-10 z-20 bg-slate-300 rounded-lg pt-3'
      onMouseEnter={() => setArrowsVisible(true)}
      onMouseLeave={() => setArrowsVisible(false)}>
      <div className='mx-3 text-white relative bg-theme-red rounded-md w-fit px-4'>{title}</div>
      <div className='relative snap-x snap-mandatory mb-5 mt-2 pb-5 max-w-[1800px] m-auto rounded-lg 
        overflow-x-scroll scrollbar-thin scrollbar-thumb-theme-red'>

        {arrowsVisible && <>
          <div className='absolute top-0 bottom-28 z-50 flex items-center content-center text-white cursor-pointer
            bg-gradient-to-t from-transparent via-gray-900/40 to-transparent hover:via-bg-gray-900'
            onClick={() => handleScroll(1)}>
            <ChevronLeftIcon className='h-7 w-7' />
          </div>
          <div className='absolute top-0 bottom-28 right-0 z-50 text-white flex cursor-pointer items-center content-center
            bg-gradient-to-t from-transparent via-gray-900/40 to-transparent hover:via-bg-gray-900'
            onClick={() => handleScroll(-1)}>
            <ChevronRightIcon className='h-7 w-7' />
          </div>
        </>}

        <div className='flex' ref={containerRef} >
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
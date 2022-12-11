import React, { useState } from 'react'
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/router'

type Props = {
  id: number,
  category: string,
  stock: number,
  discountPercentage: number,
  brand: string,
  discount: number,
  price: number,
  rating: number,
  thumbnail: string,
  title: string,
  description: string,
  quantity: number
}

const CartCard = ({
  id,
  category,
  stock,
  discountPercentage,
  brand,
  discount,
  price,
  rating,
  thumbnail,
  title,
  description,
  quantity,
}: Props) => {

  const router = useRouter()

  return (
    <div className='flex my-5 py-2 shadow-lg rounded-lg'>


      {/* left side with image */}
      <div className='relative hover:bg-black/5 z-10 flex items-center content-center rounded-lg hover:brightness-95'>
        <Image
          src={thumbnail}
          height={200}
          width={200}
          objectFit='contain'
          alt=''
          className=' object-contain rounded-md min-w-[200px] max-h-[200px]'
        />
      </div>


      {/* right side */}
      <div className=' flex flex-col justify-between 
      ml-2 mt-1'>
        <div className='pr-3'>
          <div className=' font-bold text-lg hover:text-theme-red hover:cursor-pointer line-clamp-1'>{`${brand} ${title}`}</div>
          <Rating
            name="customer-rating"
            value={rating}
            precision={0.25}
            size='small'
            readOnly
            className='mt-1 w-fit z-20 relative'
          />
          <div className='text-xs p-1 px-2 bg-theme-red text-white w-fit'>{`${discountPercentage}% off`}</div>
          <div className=' line-clamp-2 py-1'>{description}</div>
          <div className=' font-bold'>{`£${price}.00`}</div>
        </div>

        <div>{quantity}</div>

      </div>
    </div>
  )
}

export default CartCard
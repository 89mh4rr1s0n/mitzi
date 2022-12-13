import React, { useState } from 'react'
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/router'
import {
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/outline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import { decreaseQuantity, addToCart, changeQuantity } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'

type Props = {
  id: number,
  category: string,
  stock: number,
  discountPercentage: number,
  brand: string,
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
  price,
  rating,
  thumbnail,
  title,
  description,
  quantity,
}: Props) => {

  const router = useRouter()

  const dispatch = useDispatch()

  const product = {
    id: id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    // images
  }

  const addItemToCart = () => {
    dispatch(addToCart(product))
    // toast('Item added to cart')
  }

  const removeItem = () => {
    dispatch(decreaseQuantity(product))
  }

  return (
    <div className='flex p-5 py-2 my-3 rounded-lg shadow-md'>


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
          <div>{`${stock} left in stock`}</div>
        </div>

        <div className='flex my-3 items-center'>
          <div className='w-10'>{`Qty: `}</div>
          <div className='flex  rounded-lg'>

            <div className=' text-white rounded-l-md p-1 cursor-pointer hover:bg-theme-red 
            bg-theme-blue border border-theme-blue hover:border-theme-red' onClick={removeItem}>
              {quantity === 1 ? 
              <FontAwesomeIcon icon={faTrash} className='h-4 flex-grow w-[24px]' /> :
              <MinusIcon className='h-6  flex-grow p-1' />
              }
            </div>

            <input type='number' value={quantity} min={1} max={stock}
              onChange={e => parseInt(e.target.value) < stock &&  dispatch(changeQuantity({ item: product, value: parseInt(e.target.value) }))}
              className='w-8 text-center border-y focus:outline-none'>
            </input>

            <div className=' text-white rounded-r-md p-1 cursor-pointer hover:bg-theme-red 
            bg-theme-blue border border-theme-blue hover:border-theme-red' onClick={quantity < stock && addItemToCart}>
              <PlusIcon className='h-6  flex-grow p-1' />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default CartCard
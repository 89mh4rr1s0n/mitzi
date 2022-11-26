import React from 'react'
import Image from 'next/image';
import Rating from '@mui/material/Rating';

type Props = {
  brand: string,
  category: string,
  discount: number,
  price: number,
  rating: number,
  thumbnail: string,
  title: string,
  description: string
}

const MediumProductCard = ({ brand, category, discount, price, rating, thumbnail, title, description }: Props) => {
  return (
    <div className='flex my-5 py-2 border-y'>
      <Image
        src={thumbnail}
        height={200}
        width={200}
        objectFit='contain'
        alt=''
        className=' hover:cursor-pointer object-contain rounded-md min-w-[200px] max-h-[200px]'
      />
      <div className=' flex flex-col justify-between 
      ml-2 mt-1'>
        <div>
          <div className=' font-bold text-lg hover:text-theme-red hover:cursor-pointer'>{`${brand} ${title}`}</div>
          <Rating
            name="customer-rating"
            value={rating}
            precision={0.25}
            size='small'
            readOnly
            className='mt-1 w-fit z-20 relative'
          />
          <div className='text-xs p-1 px-2 bg-theme-red text-white w-fit'>{`${discount}% off`}</div>
          <div>{description}</div>
          <div className=' font-bold'>{`£${price}.00`}</div>
          {/* <div>{category}</div> */}
        </div>
        <button className="w-fit sm:relative hidden sm:inline-flex items-center justify-start px-3 py-1 bg-theme-blue overflow-hidden font-medium transition-all  rounded hover:bg-white group">
          <span className="min-w-min w-52 h-52 rounded rotate-[-40deg] bg-theme-red absolute bottom-0 left-0 -translate-x-full ease-out duration-450 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className=" whitespace-nowrap relative w-fit text-left min-w-min text-white transition-colors duration-300 ease-in-out group-hover:text-white">add to basket</span>
        </button>
      </div>
    </div>
  )
}

export default MediumProductCard
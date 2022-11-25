import React from 'react'
import Image from 'next/image';

type Props = {
  images: string[],
  categoryName: string
}

const CategoryCard = ({ images, categoryName }: Props) => {
  console.log(images)
  return (
    <div className='p-3'>
      <div className='text-white text-center pb-4'>{categoryName.toUpperCase()}</div>
      <div className='grid grid-cols-2 h-[200px] max-w-[250px] bg-white cursor-pointer rounded-lg m-auto'>
        {images.map((image, i) => (
          <div key={i}
            className='flex items-center content-center justify-center max-h-[100px] overflow-hidden'
          >
          <Image
            src={image}
            height={100}
            width={100}
            objectFit='contain'
            alt=''
            className='object-cover max-h-[100px]'
          />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryCard
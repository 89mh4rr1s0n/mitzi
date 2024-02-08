import React, { useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';

type Props = {
  images: string[],
  categoryName: string
}

const CategoryCard = ({ images, categoryName }: Props) => {

  const [hover, setHover] = useState(false)
  const router = useRouter();

  const search = () => {
    router.push({
      pathname: "/products",
      query: {
        category: [categoryName]
      }
    })
  }

  return (
    <div className='p-3 hover:bg-black/10 rounded-lg pb-10 relative'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {hover &&
        <div className='absolute flex items-center  justify-center h-full w-full'>
          <div className='relative mb-5 mr-5 bg-zinc-800 p-2 hover:text-zinc-800 hover:bg-white 
                    hover:border cursor-pointer transition-all duration-200 text-white rounded-md'
                    onClick={search}>
            view all
          </div>
        </div>}
      <div className=' text-center pb-2'>{categoryName.toUpperCase()}</div>
      <div className='grid grid-cols-2 h-[200px] max-w-[250px] bg-white cursor-pointer rounded-lg m-auto'>
        {images.map((image, i) => (
          <div key={i}
            className='flex items-center content-center justify-center max-h-[100px] overflow-hidden'
          >
            <Image
              src={image}
              height={100}
              width={100}
              // objectFit='contain'
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
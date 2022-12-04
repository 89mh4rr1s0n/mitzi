import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import ReactImageMagnify from 'react-image-magnify';
import Rating from '@mui/material/Rating';


type Props = {
  idNo: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[],
}

const LargeProductCard = ({
  idNo,
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
  images, }: Props) => {

  const [item, setItem] = useState({})

  const [activeImage, setActiveImage] = useState(images[images.length - 1])

  return (
    <div className='m-auto max-w-[850px] flex mt-6'>


      <div>
        {images.slice(0).reverse().map((image, i) => (
          <div key={i} className='my-3 mx-5 h-[50px] w-[50px] justify-center 
                flex items-center content-center cursor-pointer'
            onMouseEnter={() => setActiveImage(image)}>
            <Image
              src={image}
              height={50}
              width={50}
              alt=''
              className={`shadow-md rounded-md ${image === activeImage && ' border-theme-red border-2'/*'shadow-[0px_0px_10px_rgba(210,42,40,1)]'*/}`}
            />
          </div>
        ))}
      </div>

      {/* main image */}
      {/* <div className='rounded-lg flex items-center content-center'>
        <Image
          src={activeImage}
          height={300}
          width={300}
          alt=''
          className=' object-contain rounded-lg'
        />
      </div> */}
      <div className='flex items-center content-center justify-center object-contain z-20'>
        <ReactImageMagnify {...{
          smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: activeImage,
          },
          largeImage: {
            alt: '',
            src: activeImage,
            width: 800,
            height: 800
          },
          isHintEnabled: true,
          imageClassName: 'max-w-[400px] object-contain rounded-lg z-40',
          enlargedImageClassName: ' object-cover min-w-[800px] z-40'
        }} />

      </div>


      {/* right side text details */}
      <div className='mt-2 mx-3 max-w-[350px] flex flex-col justify-between'>

        <div className=''>
          <div className='text-xl font-semibold'>{`${brand} ${title}`}</div>
          <Rating
            name="customer-rating"
            value={rating}
            precision={0.25}
            size='small'
            readOnly
            className='mt-1 w-fit z-0'
          />
          <div className='text-xs p-1 px-2 bg-theme-red text-white w-fit'>{`${discountPercentage}% off`}</div>
          <div className=' py-1'>{description}</div>
        </div>

        <div>
          <div className=' mb-1 font-bold text-2xl'>{`£${price}.00`}</div>
          <div className='mb-5'>{`${stock} left in stock`}</div>

          <button className="w-fit sm:relative hidden sm:inline-flex items-center justify-start px-3 py-1 bg-theme-blue overflow-hidden font-medium transition-all  rounded hover:bg-white group">
            <span className="min-w-min w-52 h-52 rounded rotate-[-40deg] bg-theme-red absolute bottom-0 left-0 -translate-x-full ease-out duration-450 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className=" whitespace-nowrap relative w-fit text-left min-w-min text-white transition-colors duration-300 ease-in-out group-hover:text-white">add to basket</span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default LargeProductCard
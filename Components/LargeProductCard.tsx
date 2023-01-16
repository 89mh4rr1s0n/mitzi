import React, { use, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import ReactImageMagnify from 'react-image-magnify';
import Rating from '@mui/material/Rating';
import { addToCart } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useWindowSize } from '../utils/utils';

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

type ImagePosition = 'beside' | 'over'

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

  const dispatch = useDispatch()
  const [activeImage, setActiveImage] = useState(images[images.length - 1])
  const [width, height] = useWindowSize()
  const [imagePosition, setImagePosition] = useState<ImagePosition>()

  useEffect(() => {
    if(width > 700){
      setImagePosition('beside')
    } else {
      setImagePosition('over')
    }
  }, [width])

  const addItemToCart = () => {
    const product = {
      id: idNo,
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images
    }
    dispatch(addToCart(product))
  }

  return (
    <div className='m-auto max-w-[850px] sm:flex my-6'>

      <ToastContainer
        autoClose={1400}
      />

      <div className='flex items-center'>
        <div className='flex flex-col'>
          {images.slice(0).reverse().map((image, i) => (
            <div key={i} className='my-3 mx-5 h-[50px] w-[50px] max-h-[50px] max-w-[50px] 
                  flex items-center content-center cursor-pointer'
              onMouseEnter={() => setActiveImage(image)}>
              <Image
                src={image}
                height={50}
                width={50}
                alt=''
                className={`shadow-md rounded-md my-2 max-h-[56px] object-contain ${image === activeImage && ' border-theme-red border-2'}`}
              />
            </div>
          ))}
        </div>
        
        <div className='sm:flex items-center object-contain z-20 mr-6'>
            <ReactImageMagnify {...{
              smallImage: {
                alt: '',
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
              enlargedImagePosition: imagePosition,
              imageClassName: `max-w-[400px] max-h-[400px] min-w-[250px] min-h-[250px] w-full
              object-contain rounded-lg z-40`,
              enlargedImageClassName: ' object-contain max-w-[800px] max-h-[800px] min-w-[800px] min-h-[800px] z-40 bg-zinc-100'
            }} />
        </div>
      </div>


      {/* right side text details */}
      <div className=' mt-6 mx-8 sm:mt-2 sm:mx-3 sm:max-w-[350px] flex flex-col justify-between'>

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

          <button onClick={addItemToCart}
            className="w-fit relative inline-flex items-center justify-start px-3 py-1 bg-theme-blue overflow-hidden font-medium transition-all  rounded hover:bg-white group">
            <span className="min-w-min w-52 h-52 rounded rotate-[-40deg] bg-theme-red absolute bottom-0 left-0 -translate-x-full ease-out duration-450 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className=" whitespace-nowrap relative w-fit text-left min-w-min text-white transition-colors duration-300 ease-in-out group-hover:text-white">
              add to basket
            </span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default LargeProductCard
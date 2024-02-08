import React, { useState } from 'react'
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/router'
import { addToCart } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  brand: string,
  discount: number,
  price: number,
  rating: number,
  thumbnail: string,
  title: string,
  description: string,
  itemNo: number,
  stock: number,
  category: string
}

const MediumProductCard = ({
  brand,
  discount,
  price,
  rating,
  thumbnail,
  title,
  description,
  itemNo,
  stock,
  category }: Props) => {

  const [imageHover, setImageHover] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  const addItemToCart = () => {
    const product = {
      id: itemNo,
      title,
      description,
      price,
      discountPercentage: discount,
      rating,
      stock,
      brand,
      category,
      thumbnail,
    }
    dispatch(addToCart(product))
  }

  const searchItem = (item: number) => {
    router.push({
      pathname: '/item',
      query: {
        productNumber: item
      }
    })
  }

  return (
    <div className='flex my-5 py-2 shadow-lg rounded-lg flex-grow h-[220px]'>

      <ToastContainer
        autoClose={1400}
      />

      {/* left side with image */}
      <div className='relative hover:bg-black/5 z-10 flex items-center content-center rounded-lg hover:brightness-95 ml-2'
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}>
        <Image
          src={thumbnail}
          height={200}
          width={200}
          // objectFit='contain'
          alt=''
          className=' object-contain rounded-md min-w-[200px] max-h-[200px]'
        />
        {imageHover &&
          <div className='absolute flex items-center justify-center ml left-1/2 right-1/2 whitespace-nowrap'>
            <div className=' bg-zinc-800 p-2 hover:text-zinc-800 hover:bg-white
                    hover:border transition-all duration-200 text-white rounded-md cursor-pointer'
              onClick={() => { searchItem(itemNo) }}>
              view details
            </div>
          </div>
        }
      </div>


      {/* right side */}
      <div className=' flex flex-col justify-between 
      ml-2 mt-1 w-full'>
        <div className='pr-3'>
          <div onClick={() => { searchItem(itemNo) }}
            className=' font-bold text-lg hover:text-theme-red hover:cursor-pointer line-clamp-1'>
            {`${brand} ${title}`}
          </div>
          <Rating
            name="customer-rating"
            value={rating}
            precision={0.25}
            size='small'
            readOnly
            className='mt-1 w-fit z-20 relative'
          />
          <div className='text-xs p-1 px-2 bg-theme-red text-white w-fit'>{`${discount}% off`}</div>
          <div className=' line-clamp-2 py-1 flex-grow'>{description}</div>
          <div className=' font-bold'>{`£${price}.00`}</div>
          {/* <div>{ category }</div> */}
        </div>


        <button onClick={addItemToCart}
          className="w-fit relative inline-flex items-center justify-start px-3 py-1 bg-theme-blue overflow-hidden font-medium transition-all  rounded hover:bg-white group">
          <span className="min-w-min w-52 h-52 rounded rotate-[-40deg] bg-theme-red absolute bottom-0 left-0 -translate-x-full ease-out duration-450 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className=" whitespace-nowrap relative w-fit text-left min-w-min text-white transition-colors duration-300 ease-in-out group-hover:text-white">add to basket</span>
        </button>

      </div>
    </div>
  )
}

export default MediumProductCard
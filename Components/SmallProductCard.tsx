import React, { useState } from 'react'
import Image from 'next/image';
import Rating from '@mui/material/Rating';

type Props = {
    key: number,
    description: string,
    thumbnail: string,
    discount: number,
    rating: number
}

const SmallProductCard = ({ description, thumbnail, discount, rating }: Props) => {

    const [ratingOpen, setRatingOpen] = useState(false)
    const [hover, setHover] = useState(false)

    return (
        <div className='py-4 px-3 relative hover:bg-black/20 rounded-lg transition-all duration-400 z-40'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {hover &&
                <div className='absolute flex items-center  justify-center h-3/5 w-full'>
                    <div className='relative mr-5 bg-zinc-800 p-2 hover:text-zinc-800 hover:bg-white 
                    hover:border transition-all duration-200 text-white rounded-md cursor-pointer'>
                        view details
                    </div>
                </div>}
            <div className=' min-h-[200px] max-h-[200px] min-w-[230px] flex items-center
            content-center justify-center overflow-hidden'>
                <Image
                    src={thumbnail}
                    height={100}
                    width={200}
                    objectFit='contain'
                    alt=''
                    className='rounded-xl object-scale-down max-h-[200px]'
                />
            </div>
            <div className='text-xs ml-3 my-1 bg-theme-red text-white w-fit px-1'>{`${discount}% off`}</div>
            <div className='z-30 w-fit'
                onMouseEnter={() => setRatingOpen(true)}
                onMouseLeave={() => setRatingOpen(false)}>
                <Rating
                    name="customer-rating"
                    value={rating}
                    precision={0.25}
                    size='small'
                    readOnly
                    className='ml-2 w-fit z-20 relative'
                />
                {ratingOpen &&
                    <div className='bg-zinc-800 text-white absolute bottom-[61px] text-xs p-1 left-[115px] rounded-sm'>
                        {`Avg Rating: ${rating} out of 5`}
                    </div>
                }
            </div>
            <h4 className='mx-3 text-white text-sm line-clamp-2'>{description}</h4>
        </div>
    )
}

export default SmallProductCard
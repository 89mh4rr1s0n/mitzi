import React, { Fragment, useState } from 'react'
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/router'

type Props = {
    key: number,
    description: string,
    thumbnail: string,
    discount: number,
    rating: number,
    itemNo: number
}

const SmallProductCard = ({ description, thumbnail, discount, rating, itemNo }: Props) => {

    const [ratingOpen, setRatingOpen] = useState(false)
    const [hover, setHover] = useState(false)
    const router = useRouter()

    const searchItem = (item: number) => {
        router.push({
            pathname: '/item',
            query: {
                productNumber: item
            }
        })
    }

    return (
        <div className=' py-2 mb:py-4 mb:px-3 relative rounded-lg transition-all duration-400 z-40 snap-start '
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <div className='absolute inset-0 bg-black/0 hover:bg-black/10 rounded-lg transition-all duration-400'>
                {hover &&
                    <div className='absolute top-24 w-full flex justify-center'>
                        <div className='relative bg-zinc-800 p-2 hover:text-zinc-800 hover:bg-white 
                 transition-all duration-300 text-white rounded-md cursor-pointer'
                            onClick={() => { searchItem(itemNo) }}>
                            view details
                        </div>
                    </div>
                }
            </div>
            <div className=' min-h-[200px] max-h-[200px] min-w-[230px] flex items-center
            content-center justify-center overflow-hidden'>
                <Image
                    src={thumbnail}
                    height={200}
                    width={200}
                    // objectFit='contain'
                    alt=''
                    className='rounded-xl max-w-full max-h-[200px] object-contain'
                />
            </div>
            <div className='text-xs ml-3 mt-3 mb-1 bg-theme-red text-white w-fit px-1'>{`${discount}% off`}</div>
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
                    <div className='bg-zinc-700 text-white absolute bottom-[61px] text-xs p-1 left-[115px] rounded-sm'>
                        {`Avg Rating: ${rating} out of 5`}
                    </div>
                }
            </div>
            <h4 className='mx-3 text-black text-sm line-clamp-2'>{description}</h4>
        </div>
    )
}

export default SmallProductCard
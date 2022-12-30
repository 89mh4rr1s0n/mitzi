import React from 'react'
import moment from 'moment'
import Currency from 'react-currency-formatter'
import Image from 'next/image'

type Props = {
  id: string,
  amount: number,
  amountShipping: number,
  items: [],
  timestamp: number,
  images: string[],
}

const Order = ({ id, amount, amountShipping, items, timestamp, images }: Props) => {
  return (
    <div className='border rounded-md'>

      <div className='flex justify-between bg-zinc-100 text-xs space-x-5 sm:space-x-3 px-4 py-2'>

        <div className='flex space-x-5 sm:space-x-10 md:space-x-16'>
          <div>
            <p>ORDER PLACED</p>
            <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
          </div>

          <div>
            <p>TOTAL</p>
            <p>
              <Currency quantity={amount} currency='GBP' /> Delivery{' '}
              <Currency quantity={amountShipping} currency='GBP' />
            </p>
          </div>
        </div>

        <div className='w-40 whitespace-nowrap text-right'>
          <div className='flex flex-col sm:flex-row'>
            <p className=''>Order #</p>
            <p className=''>{id.slice(0,20)}</p>
          </div>
          <p className='text-blue-500'>{items.length} items</p>
        </div>

      </div>


      <div>
        <div className='flex space-x-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-theme-red  px-4 py-2'>
          {images.map((image: string, i: number) => (
            <Image
              key={i}
              alt=''
              src={image}
              width={120}
              height={120}
              className='object-contain rounded-md'
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
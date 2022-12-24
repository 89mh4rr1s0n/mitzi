import React from 'react'
import moment from 'moment'
import Currency from 'react-currency-formatter'
import Image from 'next/image'

type Props = {
  id: number,
  amount: number,
  amountShipping: number,
  items: [],
  timestamp: number,
  images: string[],
}

const Order = ({ id, amount, amountShipping, items, timestamp, images }: Props) => {
  console.log(items)
  return (
    <div className='border rounded-md'>

      <div className='flex justify-between bg-zinc-100 text-sm space-x-5'>

        <div className='flex space-x-10'>
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

        <div className='self-end text-end'>
          <p>Order # {id}</p>
          <p>{items.length} items</p>
        </div>

      </div>


      <div>
        <div className='flex space-x-4 overflow-x-auto'>
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
import React from 'react'
import moment from 'moment'
import Currency from 'react-currency-formatter'
import Image from 'next/image'
import { OrderItem } from '../typings'

type Props = {
  id: string,
  amount: number,
  amountShipping: number,
  items: OrderItem[],
  timestamp: number,
}

const Order = ({ id, amount, amountShipping, items, timestamp }: Props) => {

  const quantity = items.map((item:OrderItem) => item.quantity).reduce((a: number, b: number) => { return a + b })

  return (
    <div className='border rounded-md'>

      {/* top information row */}
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
            <p className=''>{id.slice(0, 20)}</p>
          </div>
          <p className='text-blue-500'>{quantity} items</p>
        </div>

      </div>


      <div className='pl-3 py-2'>
        <div className='space-y-4 overflow-x-scroll scrollbar-thin scrollbar-thumb-theme-red '>

          {items.map((item: OrderItem, i: number) => (
            <div key={i} className='flex'>
              <Image
                alt=''
                src={item.image}
                width={120}
                height={120}
                className='object-contain rounded-md mr-2 md:mr-7'
              />
              <div className='text-sm mb-2'>
                <div className='font-semibold sm:text-base'>{item.description}</div>
                <div className=' font-semibold text-base'>{`£${(item.price.unit_amount * item.quantity) / 100}.00`}
                  {item.quantity > 1 &&
                    <span className=' font-normal text-sm'>{` (@£${((item.price.unit_amount * item.quantity) / 100) / item.quantity}.00 per unit)`}</span>
                  }
                </div>
                <div>Qty:{` ${item.quantity}`}</div>
              </div>
            </div>
          ))}

        </div>
      </div>




    </div>
  )
}

export default Order
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { clearCart, selectItems } from '../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Product, CartItem } from '../typings';

const Success = ({ products }: { products: Product[] }) => {

  const router = useRouter()
  const dispatch = useDispatch()
  const cart = useSelector(selectItems)

  useEffect(() => {
    dispatch(clearCart(cart))
  }, [])

  return (
    <div>
      <Header products={products} />

      <main className='max-w-[800px] mx-auto m-4 p-10'>
        <div>

          <div className='flex items-center space-x-2'>
            <CheckCircleIcon className='h-8 text-green-500' />
            <h1 className='text-2xl'>Thank you, your order has been confirmed!</h1>
          </div>

          <p className='my-4'>
            Thank you for shopping with Mitzi, a confirmation email has been sent to your inbox.
            To view your order status please press the link below.
          </p>

          <div className='flex justify-center'>
            <button onClick={() => router.push('/orders')}
              className={`bg-theme-blue font-medium rounded-md hover:bg-theme-red text-white 
              mt-4 py-2 w-full transition-all duration-200`}>
              My Orders
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Success

export async function getServerSideProps(context: any) {
  const products = await fetch("https://dummyjson.com/products?limit=100")
  const productsJson = await products.json()

  return {
    props: {
      products: productsJson,
    }
  }
}
/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../Components/Header';
import Head from 'next/head';
import CartCard from '../Components/CartCard';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal, addToCart } from '../slices/cartSlice';
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import Currency from 'react-currency-formatter';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Product, CartItem } from '../typings';
import { useAppDispatch } from '../hooks';

const stripeKey: any = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(stripeKey)

export default function Cart({ products }: { products: Product[] }) {

  const dispatch = useAppDispatch()
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session, status } = useSession()
  const [deletedItems, setDeletedItems] = useState<CartItem[]>([])

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/checkout_session',
      {
        items,
        email: session?.user?.email
      })

    // redirect user to stripe checkout
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if (result?.error) {
      alert(result.error.message)
    }
  }

  const restoreItem = (product: CartItem) => {
    dispatch(addToCart(product))
    setDeletedItems(deletedItems.filter((items: CartItem) => product.id !== items.id))
  }

  return (
    <div>
      <Head>
        <title>Mitzi-shop</title>
      </Head>

      <Header products={products} />

      <main className='  lg:flex max-w-screen-xl m-auto'>

        {/* left side/ */}
        <div className=' bg-white rounded-lg m-5'>
          <div className='text-2xl font-semibold m-5'>Shopping Basket</div>

          {items.length === 0 &&
            <p className='ml-5'>Your Shopping Basket is empty</p>
          }

          {deletedItems.map((item: CartItem, i) => (
            <div
              key={i}
              className='ml-5 bg-slate-200 px-2 py-1 my-1 rounded-[4px] flex justify-between text-sm'>
              <div className='mr-2'>
                <span className='text-blue-500'>{`${item.brand} ${item.title}`}</span> was removed from your shopping basket
              </div>
              <button className='border border-slate-400 px-1 hover:bg-slate-300 rounded-[4px]' onClick={() => restoreItem(item)}>
                <FontAwesomeIcon icon={faRotateLeft} className='mr-1 mb-[1px] h-[14px]' />Undo
              </button>
            </div>
          ))}

          {items.map((item: CartItem, i: number) => (
            <CartCard
              key={i}
              id={item.id}
              title={item.title}
              rating={item.rating}
              price={item.price}
              description={item.description}
              category={item.category}
              thumbnail={item.thumbnail}
              stock={item.stock}
              discountPercentage={item.discountPercentage}
              brand={item.brand}
              quantity={item.quantity}
              deletedItems={deletedItems}
              setDeletedItems={setDeletedItems}
            />
          ))}
        </div>

        {/* right */}
        <div className='flex flex-col m-5 lg:ml-0 py-6 bg-white shadow-lg rounded-lg'>
          {items.length > 0 && (
            <>
              <h2 className='ml-5 whitespace-nowrap p-4'>Subtotal ({items.reduce((a, b: CartItem) => a + b.quantity, 0)} items):{" "}
                <span className='font-bold'>
                  <Currency
                    quantity={total}
                    currency='GBP'
                  />
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                className={`bg-theme-blue font-medium rounded-md hover:bg-theme-red text-white py-2 mx-4  
                ${!session && 'bg-gray-300 text-black hover:bg-gray-400 cursor-not-allowed'}`}>

                {!session ? "Sign in to Proceed" : "Proceed to Checkout"}

              </button>

            </>
          )}
        </div>

      </main>

    </div>
  )
}


export async function getServerSideProps() {
  const products = await fetch("https://dummyjson.com/products?limit=100").
    then(
      (res) => res.json()
    )

  return {
    props: {
      products,
    }
  }
}
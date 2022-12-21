import Header from '../Components/Header';
import Head from 'next/head';
import CartCard from '../Components/CartCard';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';
import { selectProducts, fetchProducts } from '../slices/productsSlice';
import { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import Currency from 'react-currency-formatter';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router'
import axios from 'axios';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);


export default function Home(/*{ products }*/) {

  const dispatch = useDispatch()

  const products = useSelector(selectProducts);
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session, status } = useSession()

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/checkout_session',
      {
        items,
        email: session.user.email
      })

    // redirect user to stripe checkout
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if (result?.error) {
      alert(result.error.message)
    }
  }

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [])


  {
    if (products.length === 0) {
      return <div>loading</div>
    }
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

          {items.map((item, i) => (
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
            />
          ))}
        </div>

        {/* right */}
        <div className='flex flex-col m-5 lg:ml-0 py-6 bg-white shadow-lg rounded-lg'>
          {items.length > 0 && (
            <>
              <h2 className='ml-5 whitespace-nowrap p-4'>Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items):{" "}
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


// export async function getServerSideProps() {
//   // const products = await fetch("https://dummyjson.com/products?limit=100").
//   //   then(
//   //     (res) => res.json()
//   //   )

//   // return {
//   //   props: {
//   //     products,
//   //   }
//   // }
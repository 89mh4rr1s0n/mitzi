import React from 'react'
import Header from '../Components/Header'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import db from '../firebase'
import moment from 'moment'
import Order from '../Components/Order'

type Props = {}

const Orders = ({ orders, products }) => {

  const { data: session, status } = useSession()
  console.log(orders)

  return (
    <div>
      <Header products={products}/>
      <main className='max-w-screen-lg mx-auto p-10'>
        <h1 className='text-2xl font-semibold border-b mb-2 pb-1 border-theme-blue'>
          Your Orders
        </h1>

        {session ? (
          <h2>{`${orders.length} orders`}</h2>
        ) : (
          <h2>Please sign in to view your orders</h2>
        )}

        <div className='mt-5 space-y-10'>
          {orders.map((
            { id, amount, amountShipping, items, timestamp, images }
          ) => (
            <Order
            key={id}
            id={id}
            amount={amount}
            amountShipping={amountShipping}
            items={items}
            timestamp={timestamp}
            images={images}
            />
          ))}

        </div>

        <div>

        </div>
      </main>
    </div>
  )
}

export default Orders

export async function getServerSideProps(context: any) {
  const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

  const session = await getSession(context)

  const products = await fetch("https://dummyjson.com/products?limit=100")
  const productsJson = await products.json()

  const stripeOrders = await db
    .collection('users')
    .doc(session.user.email)
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get()

  const orders = await Promise.all(
    stripeOrders.docs.map( async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  )

  return {
    props: {
      products: productsJson,
      orders
    }
  }
}
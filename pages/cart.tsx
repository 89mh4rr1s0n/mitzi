import Header from '../Components/Header';
import Head from 'next/head';
import CartCard from '../Components/CartCard';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';
import { selectProducts, fetchProducts } from '../slices/productsSlice';
import { useEffect } from 'react'

import { useRouter } from 'next/router'

export default function Home(/*{ products }*/) {

  const dispatch = useDispatch()

  const products = useSelector(selectProducts);
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

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

      <main className=' bg-slate-50'>


        {/* left side/ */}
        <div className=' bg-white m-5'>
          <div className='text-2xl font-semibold'>Shopping Basket</div>

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
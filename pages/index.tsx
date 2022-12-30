import Head from 'next/head'
import Header from '../Components/Header'
import Homefeed from '../Components/Homefeed'
import Homefeed2 from '../Components/Homefeed2'
import CategoryGrid from '../Components/CategoryGrid'
import Banner from '../Components/Banner'
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectCategories,
  selectMostDiscounted,
  selectTopRated
} from '../slices/productsSlice'
import getStore, { store } from '../store'
import { useEffect } from 'react'
import Footer from '../Components/Footer'

export default function Home(/*{ products }*/) {

  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const categories = useSelector(selectCategories)
  const mostDiscounted = useSelector(selectMostDiscounted)
  const topRated = useSelector(selectTopRated)

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [])

  console.log(products)

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

      <Banner />

      <main className='-mt-44 z-50'>

        <Homefeed2
          title='Shop our biggest discounted items'
          products={mostDiscounted}
        />

        <Homefeed2
          title='Shop our highest rated items'
          products={topRated}
        />

        <CategoryGrid
          title='Shop by category'
          products={products.products}
          categories={categories}
        />

      </main>

      {/* <Footer/> */}

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

//   // const store = getStore()
//   const store = getStore()
//   await store.dispatch(fetchProducts())
//   return {
//     props: {
//       initialState: store.getState(),
//     }
//   }
// }



/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Header from '../Components/Header'
import Homefeed2 from '../Components/Homefeed2'
import CategoryGrid from '../Components/CategoryGrid'
import Banner from '../Components/Banner'
import { Product, ProductData } from '../typings'


export default function Home({ products }: any) {

  const mostDiscounted = products.products.slice().sort((a:Product, b:Product) => b.discountPercentage - a.discountPercentage).slice(0, 10)
  const topRated = products.products.slice().sort((a:Product, b:Product) => b.rating - a.rating).slice(0, 10)
  const categories = products.products.map((p:Product) => p.category).reduce(function (a:Product[], b:Product) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()

  {
    if (products.limit === 0) {
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
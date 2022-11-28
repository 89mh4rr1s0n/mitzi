import Head from 'next/head'
import Header from '../Components/Header'
import Homefeed from '../Components/Homefeed'
import Homefeed2 from '../Components/Homefeed2'
import CategoryGrid from '../Components/CategoryGrid'
import Banner from '../Components/Banner'

export default function Home({ products }) {

  const categories = products.products.map(p => p.category).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()

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
          products={products.products.sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 10)}
        />

        <Homefeed2
          title='Shop our highest rated items'
          products={products.products.sort((a, b) => b.rating - a.rating).slice(0, 10)}
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

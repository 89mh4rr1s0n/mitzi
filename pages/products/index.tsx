import Head from 'next/head'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import ProductFeed from '../../Components/ProductFeed'

export default function Home({ products }) {

  return (
    <div>
      <Head>
        <title>Mitzi-shop</title>
      </Head>

      <Header products={products} />

      <main>

        <ProductFeed products={products} />

      </main>

      <Footer/>

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
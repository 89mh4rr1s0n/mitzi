import Head from 'next/head'
import Header from '../../Components/Header'
import ProductFeed from '../../Components/ProductFeed'
import { Product } from '../../typings'

export default function Home({ products, filteredProducts }:{products: Product[], filteredProducts: Product[]}) {

  return (
    <div>
      <Head>
        <title>Mitzi-shop</title>
      </Head>

      <Header products={products} />

      <main>
        <ProductFeed products={filteredProducts} searchedProducts={filteredProducts} />
      </main>

    </div>
  )
}

export async function getServerSideProps(context: any) {
  const products = await fetch("https://dummyjson.com/products?limit=100")
  const productsJson = await products.json()
  let filteredProducts = productsJson.products
  if (context.query.search !== undefined) {
    filteredProducts = productsJson.products.filter((product:Product) =>
      product.title.toLowerCase().includes(context.query.search.toLowerCase()) ||
      product.description.toLowerCase().includes(context.query.search.toLowerCase()) ||
      product.brand.toLowerCase().includes(context.query.search.toLowerCase())
    )
  }

  return {
    props: {
      products: productsJson,
      filteredProducts
    }
  }
}
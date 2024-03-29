import Head from 'next/head'
import Header from '../Components/Header'
import LargeProductCard from '../Components/LargeProductCard'
import { Product } from '../typings';

export default function Home({ products, item }:{products: Product[], item: Product}) {

  return (
    <div>
      <Head>
        <title>Mitzi-shop</title>
      </Head>

      <Header products={products} />

      <main>

      <LargeProductCard
          idNo={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          discountPercentage={item.discountPercentage}
          rating={item.rating}
          stock={item.stock}
          brand={item.brand}
          category={item.category}
          thumbnail={item.thumbnail}
          images={item.images!}
       />

      </main>

    </div>
  )
}


export async function getServerSideProps(context: any) {
  const products = await fetch("https://dummyjson.com/products?limit=100")
  const productsJson = await products.json()
  const item = await productsJson.products.filter((p:Product) => context.query.productNumber == p.id)[0]

  return {
    props: {
      products: productsJson,
      item: item
    }
  }
}
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

      <main>

      item here

      </main>

    </div>
  )
}



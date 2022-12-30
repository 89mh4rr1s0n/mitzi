import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

type Props = {
  // products,
  children: any
}

const Layout = ({ /*products,*/ children }: Props) => {
  return (
    <div>
      <Head>
        <title>Mitzi-shop</title>
      </Head>
      {/* <Header products={products} /> */}
      {children}
      <Footer />
    </div>
  )
}

export default Layout

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
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MediumProductCard from './MediumProductCard'

type Props = {
  products
}

const ProductFeed = ({ products }: Props) => {

  const router = useRouter()
  const [filteredProducts, setFilteredProducts] = useState([])
  console.log(router.query)

  useEffect(() => {
    setFilteredProducts(products.products.filter(product =>
      router.query.category === product.category
      ))
  }, [])

  return (
    <div className='my-5 pb-5 max-w-[800px] m-auto rounded-lg'>
      <div>{`${filteredProducts.length} RESULTS FOUND`}</div>
      {filteredProducts.map((product) => (
        <MediumProductCard
          key={product.id}
          brand={product.brand}
          category={product.category}
          discount={product.discountPercentage}
          price={product.price}
          rating={product.rating}
          thumbnail={product.thumbnail}
          title={product.title}
          description={product.description}
        />
      ))}
    </div>
  )
}

export default ProductFeed
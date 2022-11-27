/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MediumProductCard from './MediumProductCard'
import Checkbox from './Checkbox'
import Dropdown from './Dropdown'

type Props = {
  products
}

const ProductFeed = ({ products }: Props) => {

  const router = useRouter()
  const [sort, setSort] = useState<string | number>('')
  const [checkedCategories, setCheckecCategories] = useState([router.query.category])
  console.log(checkedCategories.flat())

  const [filteredProducts, setFilteredProducts] = useState([])
  console.log(router.query)

  const handleCheck = (event) => {
    var updatedList = checkedCategories;
    if (event.target.checked) {
      checkedCategories.push(event.target.value)
    } else {
      updatedList.splice(checkedCategories.indexOf(event.target.value), 1);
    }
    setCheckecCategories(updatedList);
    const newQuery = {
      ...router,
      query: {
        category: updatedList
      }
    }
    router.push(newQuery)
  };

  // console.log(sort)

  useEffect(() => {
    if(sort === 'priceLoToHi'){
      setFilteredProducts([...filteredProducts].sort((a,b) => a.price - b.price))
    } else if (sort === 'priceHiToLo'){
      setFilteredProducts([...filteredProducts].sort((a,b) => b.price - a.price))
    }
  }, [sort])

  console.log(sort)
  console.log(filteredProducts)

  // useEffect(() => {
  //   if (router.query.category === undefined) {
  //     setCheckecCategories([])
  //   }
  // }, [])

  useEffect(() => {
    if(checkedCategories === undefined){
      setFilteredProducts(products.products)
    } else {
      setFilteredProducts(products.products.filter(product =>
        checkedCategories.flat().includes(product.category)
      ))
    }
  }, [router, checkedCategories])

  const categories = products.products.map(p => p.category).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()
  const brands = filteredProducts.map(p => p.brand).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()

  return (
    <div className='my-5 pb-5 max-w-[1000px] m-auto rounded-lg flex'>
      <div className=' min-w-[190px]'>
        <div className=' font-semibold my-2 mt-8 pt-4'>Category</div>
        {categories.map((category: string, i) => (
          // <Checkbox key={i} value={category} field='category'/>
          <div key={i}>
            <input value={category} id={category} name={category} type="checkbox" onChange={handleCheck}
              defaultChecked={checkedCategories.flat()?.filter(i => i === category).includes(category)} />
            <span className='ml-2'>{category}</span>
          </div>
        ))}
        <div className=' font-semibold my-2 pt-4'>Brand</div>
        {brands.map((brand: string, i) => (
          <Checkbox key={i} value={brand} field='brand' />
        ))}
      </div>
      <div>
        <div className='flex justify-between items-center'>
          <div>{`${filteredProducts.length} RESULTS FOUND`}</div>
          {/* <div>sort by</div> */}
          <Dropdown sort={sort} setSort={setSort} title='Sort By:'
            values={[
              {val: 'priceLoToHi', label: 'Price Low To High'},
              {val: 'priceHiToLo', label: 'Price High To Low'}
            ]}
          />
        </div>
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
    </div>
  )
}

export default ProductFeed
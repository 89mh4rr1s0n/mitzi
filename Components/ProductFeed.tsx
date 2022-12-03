/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MediumProductCard from './MediumProductCard'
import Checkbox from './Checkbox'
import Dropdown from './Dropdown'
import { fetchProducts, selectProducts } from '../slices/productsSlice'
import { addCategory, removeCategory, selectCategories, clearCategories } from '../slices/filtersSlice'
import { useSelector, useDispatch } from "react-redux";

type Props = {
  products
}

const ProductFeed = ({ products }: Props) => {

  const dispatch = useDispatch()
  const allProducts = useSelector(selectProducts)
  const cats = useSelector(selectCategories)
  console.log(allProducts)
  // console.log(cats)

  useEffect(() => {
    // if(allProducts === []){
    dispatch(fetchProducts())
    // }
  }, [])

  const router = useRouter()
  const [sort, setSort] = useState<string | number>('rating')
  const [checkedCategories, setCheckecCategories] = useState([router.query.category])
  // console.log(checkedCategories.flat())

  const [filteredProducts, setFilteredProducts] = useState([])
  // console.log(router.query)

  // const handleCategoryCheck = (event) => {
  //   var updatedList = checkedCategories;
  //   if (event.target.checked) {
  //     if(event.target.value === 'all'){
  //       updatedList = ['all']
  //     } else {
  //       // setCheckecCategories([])
  //       // updatedList.splice(checkedCategories.indexOf('all'), 1);
  //       checkedCategories.push(event.target.value)
  //     }
  //   } else {
  //     updatedList.splice(checkedCategories.indexOf(event.target.value), 1);
  //   }
  //   setCheckecCategories(updatedList);
  //   const newQuery = {
  //     ...router,
  //     query: {
  //       category: updatedList
  //     }
  //   }
  //   router.push(newQuery)
  // };

  const handleCategoryCheck = (event) => {
    if (event.target.checked) {
      dispatch(addCategory(event.target.value))
    } else {
      dispatch(removeCategory(event.target.value))
    }
  }

  console.log(sort)

  const sortProducts = (arr: [], sorting: string) => {
    if (sorting === 'priceLoToHi') {
      return arr.sort((a, b) => a.price - b.price)
    } else if (sorting === 'priceHiToLo') {
      return arr.sort((a, b) => b.price - a.price)
    } else if (sorting === 'rating') {
      return arr.sort((a, b) => b.rating - a.rating)
    }
  }

  // useEffect(() => {
  //   if (sort === 'priceLoToHi' && cats.length === 0) {
  //     setFilteredProducts([...filteredProducts].sort((a, b) => a.price - b.price))
  //   } else if (sort === 'priceHiToLo' && cats.length === 0) {
  //     setFilteredProducts([...filteredProducts].sort((a, b) => b.price - a.price))
  //   } else if (sort === 'rating' && cats.length === 0) {
  //     setFilteredProducts([...filteredProducts].sort((a, b) => b.rating - a.rating))
  //   }
  // }, [sort])

  // useEffect(() => {
  //   setSort('')
  // }, [checkedCategories, router])

  useEffect(() => {
    if (cats.length === 0) {
      setFilteredProducts(sortProducts(products.products, sort))
    } else {
      setFilteredProducts(sortProducts(
        products.products.filter(product => cats.includes(product.category)),
        sort
      ))
    }
  }, [cats, sort])

  const categories = products.products.map(p => p.category).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()
  const brands = filteredProducts.map(p => p.brand).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()

  return (
    <div className='my-5 pb-5 max-w-[1000px] m-auto rounded-lg flex'>


      <div className=' min-w-[190px] px-1 mx-1 '>

        {/* categories filter checkboxes */}
        <div className=' font-semibold my-2 mt-8 pt-4 '>Category</div>
        <div className='bg-slate-100 rounded-lg px-1'>
          {categories.map((category: string, i) => (
            <div key={i}>
              <input value={category} id={category} name={category} type="checkbox" onChange={handleCategoryCheck}
                defaultChecked={checkedCategories.flat()?.filter(i => i === category).includes(category)} />
              <span className='ml-2'>{category}</span>
            </div>
          ))}
        </div>


        {/* brand filter checkboxes */}
        <div className=' font-semibold my-2 pt-4'>Brand</div>
        {brands.map((brand: string, i) => (
          <Checkbox key={i} value={brand} field='brand' />
        ))}


      </div>


      <div>

        {/* top row of feed with sorting dropdown */}
        <div className='flex justify-between items-center'>
          <div>{`${filteredProducts.length} RESULTS FOUND`}</div>
          {/* <div>sort by</div> */}
          <Dropdown sort={sort} setSort={setSort} title='Sort By:'
            values={[
              { val: 'rating', label: 'Top Rated (default)' },
              { val: 'priceLoToHi', label: 'Price Low To High' },
              { val: 'priceHiToLo', label: 'Price High To Low' }
            ]}
          />
        </div>


        {sortProducts(filteredProducts, sort).map((product, i) => (
          <MediumProductCard
            key={i}
            itemNo={product.id}
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
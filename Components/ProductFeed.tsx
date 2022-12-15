/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MediumProductCard from './MediumProductCard'
import Checkbox from './Checkbox'
import Dropdown from './Dropdown'
import Pagination from './Pagination'
import { fetchProducts, selectProducts } from '../slices/productsSlice'
import { addCategory, removeCategory, selectCategories, clearCategories, selectAllFilters, updateCategories } from '../slices/filtersSlice'
import { useSelector, useDispatch } from "react-redux";

type Props = {
  products
}

const ProductFeed = ({ products }: Props) => {

  const dispatch = useDispatch()
  const allProducts = useSelector(selectProducts)
  const cats = useSelector(selectCategories)
  const allFilters = useSelector(selectAllFilters)
  console.log(allFilters)
  const router = useRouter()
  const [sort, setSort] = useState<string | number>('rating')
  const [checkedCategories, setCheckecCategories] = useState([router.query.category])
  console.log(cats)
  // console.log(cats)

  console.log(router.query)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfItem = currentPage * postsPerPage;
  const indexOfFItem = indexOfItem - postsPerPage;
  // const currentPosts = posts.slice(indexOfFItem, indexOfItem);
  const [filteredProducts, setFilteredProducts] = useState([].slice(indexOfFItem, indexOfItem))

  const paginatedProducts = filteredProducts.slice(indexOfFItem, indexOfItem)

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    // if(allProducts === []){
    dispatch(fetchProducts())
    // }
  }, [])


  // sort on page load if router has a category query
  useEffect(() => {
    router.query.category ?
      dispatch(updateCategories([router.query.category])) :
      dispatch(clearCategories())
  }, [])

  const sortProducts = (arr: [], sorting: string) => {
    if (sorting === 'priceLoToHi') {
      // const newQuery = {
      //   ...router,
      //   query: {
      //     sort: 'priceLoToHi'
      //   }
      // }
      router.push(newQuery)
      return arr.sort((a, b) => a.price - b.price)
    } else if (sorting === 'priceHiToLo') {
      return arr.sort((a, b) => b.price - a.price)
    } else if (sorting === 'rating') {
      return arr.sort((a, b) => b.rating - a.rating)
    }
  }


  const handleCategoryCheck = (event) => {
    if (event.target.checked) {
      dispatch(addCategory(event.target.value))
    } else {
      dispatch(removeCategory(event.target.value))
    }
    // const newQuery = {
    //   ...router,
    //   query: {
    //     category: cats
    //   }
    // }
    // router.push(newQuery)
  }

  // console.log(sort)


  useEffect(() => {
    if (cats.length === 0) {
      setFilteredProducts(sortProducts(products.products, sort)/*.slice(indexOfFItem, indexOfItem)*/)
      setBrands(products.products.map(p => p.brand).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort())
    } else {
      setBrands(filteredProducts.map(p => p.brand).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort())
      setFilteredProducts(sortProducts(
        products.products.filter(product => cats.includes(product.category)),
        sort
      )/*.slice(indexOfFItem, indexOfItem)*/)
    }

    const newQuery = {
      ...router,
      query: {
        category: cats
      }
    }
    router.push(newQuery)
  }, [cats, sort])

  const categories = products.products.map(p => p.category).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()
  // const brands = filteredProducts.map(p => p.brand).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()

  const [brands, setBrands] = useState(products.products.map(p => p.brand).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort())

  return (
    <div className='my-5 pb-5 max-w-[1000px] m-auto rounded-lg flex'>


      <div className=' min-w-[190px] px-1 mx-1 '>

        {/* categories filter checkboxes */}
        <div className=' font-semibold my-2 mt-8 pt-4 '>Category</div>
        <div className='bg-slate-100 rounded-lg px-1'>
          {categories.map((category: string, i) => (
            <div key={i}>
              <input value={category} id={category} name={category} type="checkbox" onChange={handleCategoryCheck}
                checked={cats.filter(i => i === category).includes(category)} />
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


        {sortProducts(paginatedProducts, sort).map((product, i) => (
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
            stock={product.stock}
          />
        ))}


        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredProducts.length}
          paginate={paginate}
        />

      </div>
    </div>
  )
}

export default ProductFeed
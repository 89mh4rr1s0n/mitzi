/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MediumProductCard from './MediumProductCard'
import Checkbox from './Checkbox'
import Dropdown from './Dropdown'
import Rating from '@mui/material/Rating';
import Pagination from './Pagination'
import { fetchProducts, selectProducts } from '../slices/productsSlice'
import {
  addCategory, removeCategory, selectCategories, clearCategories, selectAllFilters,
  updateCategories, selectBrands, addBrand, removeBrand,
  selectMinPrice, selectMaxPrice
} from '../slices/filtersSlice'
import { useSelector, useDispatch } from "react-redux";
import useCollapse from 'react-collapsed'
import CheckboxFilterColumn from './CheckboxFilterColumn'
import PriceRangeSlider from './PriceRangeSlider'
import { faBars, faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MediumProductGridCard from './MediumProductGridCars'
import { Product, Sortings } from '../typings'
import { AppDispatch } from '../store'

type Props = {
  products: Product[],
  searchedProducts: Product[]
}

type Fields = "brand" | "category" | "description";
type Display = 'bars' | 'grid'

const ProductFeed = ({ products, searchedProducts }: Props) => {
  
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const cats = useSelector(selectCategories)
  const brandsArr = useSelector(selectBrands)
  const [sort, setSort] = useState<Sortings>('rating')
  
  const [categories, setCategories] = useState(products.map(p => p.category).reduce(function (a: string[], b: string) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort())
  const [brands, setBrands] = useState(products.filter(product => cats.includes(product.category)).map(p => p.brand).sort())
  const [display, setDisplay] = useState<Display>('bars')
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfItem = currentPage * postsPerPage;
  const indexOfFItem = indexOfItem - postsPerPage;
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  const [min, setMin] = useState(Math.min(...products.map((i) => i.price)))
  const [max, setMax] = useState(Math.max(...products.map((i) => i.price)))
  const [rating, setRating] = useState(0)
  const [value, setValue] = useState<number[]>([min, max]);

  // sort on page load if router has a category query
  useEffect(() => {
    if (router.query.category) {
      if (typeof (router.query.category) === 'string') {
        dispatch(updateCategories([router.query.category]))
      } else {
        dispatch(updateCategories(router.query.category))
      }
    } else {
      dispatch(clearCategories())
    }
  }, [])

  const sortProducts = (arr: Product[], sorting: Sortings):Product[] => {
    if (sorting === 'priceLoToHi') {
      return arr.sort((a, b) => a.price - b.price)
    } else if (sorting === 'priceHiToLo') {
      return arr.sort((a, b) => b.price - a.price)
    } else {
      return arr.sort((a, b) => b.rating - a.rating)
    } 
  }

  const handleCategoryCheck = (event: { target: { checked: boolean; value: string } }) => {
    if (event.target.checked) {
      dispatch(addCategory(event.target.value))
    } else {
      dispatch(removeCategory(event.target.value))
    }
  }

  const handleBrandCheck = (event: { target: { checked: boolean; value: string } }) => {
    if (event.target.checked) {
      dispatch(addBrand(event.target.value))
    } else {
      dispatch(removeBrand(event.target.value))
    }
  }

  const handleCheckboxFilter = (arr: Product[], filterArr: string[], field: Fields) => {
    if (filterArr.length === 0) {
      return sortProducts(arr, sort)
    } else {
      return sortProducts(arr.filter(product => filterArr.includes(product[field])), sort)
    }
  }

  const handlePriceFilter = (arr: Product[]) => {
    return arr.filter(item => item.price >= value[0] && item.price <= value[1])
  }

  useEffect(()=>{
    setCurrentPage(1)
  }, [router.query])

  useEffect(() => {
    let categoryFilteredProducts: Product[] = handleCheckboxFilter(products, cats, 'category') // invokes category filter
    let brandAndCategoryFilteredProducts: any = handleCheckboxFilter(categoryFilteredProducts, brandsArr, 'brand') // invokes brand fillter
    let brandCategoryAndRatingFilteredProducts = brandAndCategoryFilteredProducts.filter((item:Product) => item.rating > rating) // invokes rating filter
    let brandCategoryRatingAndPriceFilteredProducts: Product[] = handlePriceFilter(brandCategoryAndRatingFilteredProducts) // invokes price filter
    setFilteredProducts(brandCategoryRatingAndPriceFilteredProducts)
    setMin(Math.min(...brandAndCategoryFilteredProducts.map((i:Product) => i.price)))
    setMax(Math.max(...brandAndCategoryFilteredProducts.map((i:Product) => i.price)))
    setCurrentPage(1)

    // const newQuery = {
    //   ...router,
    //   query: {
    //     category: cats
    //   }
    // }
    // router.push(newQuery)
  }, [cats, brandsArr, sort, value, rating, router.query])


  useEffect(() => {
    if (cats.length === 0) {
      setBrands(products.map(p => p.brand).reduce(function (a: string[], b: string) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort())
    } else {
      setBrands(products.filter(product => cats.includes(product.category)).map(p => p.brand).sort())
    }
  }, [cats, router.query])

  useEffect(() => {
    if (brandsArr.length === 0) {
      setCategories(products.map(p => p.category).reduce(function (a: string[], b: string) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort())
    } else {
      setCategories(products.filter(product => brandsArr.includes(product.brand)).map(p => p.category).sort())
    }
  }, [brandsArr, router.query])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage])

  return (
    <div className='my-5 px-3 pb-5 max-w-[1200px] m-auto rounded-lg flex flex-grow justify-center'>


      {/* filter panel column */}
      <div className=' min-w-[200px] px-1 mx-1'>

        {/* categories filter checkboxes */}
        <div className=' font-semibold mt-6 mb-1 pt-4 '>Category</div>
        <div>
          <CheckboxFilterColumn
            values={categories}
            onChange={handleCategoryCheck}
            checkerArr={cats}
          />
        </div>


        {/* brand filter checkboxes */}
        <div className=' font-semibold my-2 pt-4'>Brand</div>
        <div>
          <CheckboxFilterColumn
            values={brands}
            onChange={handleBrandCheck}
            checkerArr={brandsArr}
          />
        </div>

        {/* price range filter */}
        <div className=' font-semibold my-2 pt-4'>Price</div>
        <PriceRangeSlider
          min={min}
          max={max}
          value={value}
          setValue={setValue}
        />


        <div className=' font-semibold my-2 pt-4'>Rating</div>
        <div className='flex flex-col mt-2 space-y-1'>
          {[0, 1, 2, 3, 4].reverse().map((value, i) => (<>
            <div className='flex items-center'>
              <input
                className='mr-2'
                type="radio"
                // id={value}
                name="rating"
                value={value}
                onChange={() => setRating(value)}
                checked={rating === value}
              />
              <label htmlFor={value.toString()} className='flex items-center'>
                <Rating
                  name="customer-rating"
                  value={value}
                  precision={0.25}
                  size='small'
                  readOnly
                  className='w-fit z-20 relative'
                /><span className='text-sm ml-1'>& up</span>
              </label>

            </div>
          </>))}
        </div>

      </div>

      <div className='flex-grow'>

        {/* top row of feed with sorting dropdown */}
        <div className='flex justify-between items-center flex-grow'>
          <div>{`${filteredProducts.length} RESULTS FOUND`}</div>

          <div className=' rounded-[4px] flex item-center content-center h-[40px]'>

            <div onClick={() => setDisplay('bars')} className={` hover:text-gray-100 hover:bg-gray-500 p-1 cursor-pointer w-[40px] h-[40px] flex 
            rounded-l-[4px] border-l border-y border-[#b7b9bc] ${display === 'bars' ? 'bg-theme-blue text-white' : 'text-gray-800'}`} >
              <FontAwesomeIcon icon={faBars} className='m-auto h-6' />
            </div>

            <div onClick={() => setDisplay('grid')} className={` hover:text-gray-100 hover:bg-gray-500 p-1 cursor-pointer w-[40px] h-[40px] flex 
            rounded-r-[4px] border border-[#b7b9bc] ${display === 'grid' ? 'bg-theme-blue text-white' : 'text-gray-800'}`}>
              <FontAwesomeIcon icon={faGripVertical} className='m-auto h-6' />
            </div>

          </div>

          {/* <div>sort by</div> */}
          <Dropdown sort={sort} setSort={setSort} title='Sort By:'
            values={[
              { val: 'rating', label: 'Top Rated (default)' },
              { val: 'priceLoToHi', label: 'Price Low To High' },
              { val: 'priceHiToLo', label: 'Price High To Low' }
            ]}
          />
        </div>

        <div className={`${display === 'grid' && 'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} w-full`}>

          {sortProducts(filteredProducts, sort).slice(indexOfFItem, indexOfItem).map((product, i) => (
            display === 'bars' ?

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
              :
              <MediumProductGridCard
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
        </div>


        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredProducts.length}
          paginate={paginate}
          pageNumber={currentPage}
        />

      </div>
    </div>
  )
}

export default ProductFeed
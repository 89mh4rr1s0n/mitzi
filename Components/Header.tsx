/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
    ChevronDownIcon
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/dist/client/router';
import { selectItems } from '../slices/cartSlice';
import { updateCategories } from '../slices/filtersSlice'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import useCollapse from 'react-collapsed'

type Props = {
    products
}

const Header = ({ products }: Props) => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch();
    const items = useSelector(selectItems);
    const categories = products.products.map(p => p.category).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort();
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchWord, setSearchWord] = useState('');

    const searchCategory = (categoryName: string) => {
        dispatch(updateCategories([categoryName]))
        router.push({
            pathname: "/products",
            query: {
                category: [categoryName]
            }
        })
    }

    const searchItem = (item: number) => {
        setSearchWord('')
        router.push({
            pathname: '/item',
            query: {
                productNumber: item
            }
        })
    }

    const searchQuery = (event) => {
        setSearchWord('')
        event.preventDefault()
        console.log(event.target[0].value)
        router.push({
            pathname: '/products',
            query: {
                search: event.target[0].value
            }
        })
    }

    const handleFilter = (e) => {
        setSearchWord(e.target.value)
    }


    useEffect(() => {
        if (searchWord === '') {
            setFilteredProducts([])
        } else if (searchWord.length > 0) {
            setFilteredProducts(products.products.filter(product =>
                product.title.toLowerCase().includes(searchWord.toLowerCase()) ||
                product.description.toLowerCase().includes(searchWord.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchWord.toLowerCase())
            ))
        }
    }, [searchWord]);

    return (
        <>
            <header >
                {/* top nav */}
                <div className='flex items-center justify-between p-1 flex-grow py-2 bg-slate-100'>
                    <div className='mt-2 pl-5 flex items-center flex-grow sm:flex-grow-0 mr-5 cursor-pointer'
                        onClick={() => router.push("/")}>
                        <Image
                            src='/pngaaa.com-1757256.png'
                            width={60}
                            height={60}
                            objectFit='contain'
                            alt=''
                        />
                        <div className='text-theme-red text-2xl font-bold hidden sm:inline'>ITZI</div>
                    </div>

                    {/* search form */}
                    <form
                        onSubmit={searchQuery}
                        className={`hidden relative items-center sm:flex h-8 max-w-[550px] 
                        border ${filteredProducts.length > 0 ? 'rounded-tl-md' : 'rounded-md'} flex-grow cursor-pointer`}>
                        <input
                            value={searchWord}
                            className={`h-full flex-grow flex-shrink ${filteredProducts.length > 0 ? 'rounded-tl-md' : 'rounded-l-md'}  focus:outline-none px-2`}
                            type="text"
                            onChange={handleFilter}
                            onSubmit={() => searchQuery(searchWord)}
                        />
                        <SearchIcon
                            className='h-8 bg-theme-red text-white hover:bg-theme-blue p-1.5 rounded-r-md'
                        />

                        {/* search results */}
                        {searchWord.length > 0 &&
                            <div className='absolute block right-[32px] top-[31px] bg-slate-100 border left-0 z-50 rounded-b-lg pb-1'>
                                <div className='flex flex-col'>
                                    {filteredProducts.length > 0 ? filteredProducts.slice(0, 12).map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => searchItem(item.id)}
                                            className='line-clamp-1 font-semibold text-slate-600 hover:bg-slate-200 px-2'>
                                            <span className='font-bold text-black'>{item.brand}</span> {item.title} <span className='text-sm'>in</span> {item.category}
                                        </div>
                                    )) :
                                        <div className='line-clamp-1 font-semibold text-slate-600 ml-2'>
                                            No items match your search. Please try another search
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </form>

                    {/* right */}
                    <div className='text-black flex items-center text-xs space-x-1 mx-5 whitespace-nowrap'>
                        <div
                            className={`flex flex-col justify-between h-full link relative hover:bg-slate-200 p-2 
                            ${session ? 'rounded-t-[4px] border-t border-x cursor-default' : 'rounded-[4px] border'} border-slate-100 hover:border-slate-400`}
                            {...getToggleProps({
                                onMouseEnter: () => setExpanded((prevExpanded) => !prevExpanded),
                                onMouseLeave: () => setExpanded((prevExpanded) => !prevExpanded),
                            })} >
                            {/* <FontAwesomeIcon icon={faUser} className='mx-2 h-4' /> */}
                            <div className={`link ${session && 'cursor-default'}`} /*onClick={handleSignIn}*/ onClick={!session ? signIn : console.log('')}>
                                <p>
                                    {session ? `${session.user.name}` : `Sign In`}
                                </p>
                                <p className='font-bold md:text-sm flex justify-between'>{`Account`}{session && <ChevronDownIcon className='h-3 self-end mb-[2px]' />}</p>

                                {session && isExpanded &&
                                    <div className='absolute z-50 top-12 right-0 left-0 bg-slate-200 px-2 mx-[-1px] 
                                    border-b border-x border-slate-400 rounded-b-[4px] cursor-default'
                                        {...getCollapseProps()}>
                                        <button onClick={session && signOut}
                                            className='bg-theme-red hover:bg-red-700 transition-all duration-300 text-white 
                                            my-3 py-1 w-full rounded-[4px] text-[14px] font-semibold h-7'>
                                            <FontAwesomeIcon icon={faArrowRightToBracket} className='mr-2 h-[14px]' />
                                            Logout
                                        </button>
                                    </div>
                                }

                            </div>
                        </div>

                        <div onClick={() => router.push('/orders')}
                            className='link border-slate-100 hover:border-slate-400 hover:bg-slate-200 border rounded-[4px] p-2'>
                            <p>My</p>
                            <p className='font-bold md:text-sm'>{`Orders`}</p>
                        </div>

                        <div className='relative link flex items-end border-slate-100 h-[54px] hover:border-slate-400 hover:bg-slate-200 border rounded-[4px] p-2' onClick={() => router.push("cart")}>
                            <span
                                className='absolute top-3 right-2 sm:right-12 bg-theme-red
                                rounded-full h-4 w-4 text-center text-white font-bold'>
                                {items.reduce((a, b) => a + b.quantity, 0)}
                            </span>
                            <ShoppingCartIcon className='h-7' />
                            <p className='hidden sm:inline font-bold md:text-sm mt-3'>Basket</p>
                        </div>
                    </div>
                </div>

                {/* bottom nav */}
                <div
                    className='flex items-center bg-amazon_blue-light text-sm text-white bg-slate-300
                    space-x-3 px-2 py-1 pt-2 sm:overflow-x-scroll scrollbar-thin scrollbar-thumb-theme-red'>
                    <MenuIcon className='inline sm:hidden h-6 mr-2' />
                    {categories.map((cat: string, i: number) => (
                        <button key={i} onClick={() => searchCategory(cat)} className="min-w-min sm:relative hidden sm:inline-flex items-center justify-start px-3 py-1 bg-theme-blue overflow-hidden font-medium transition-all  rounded hover:bg-white group">
                            <span className="min-w-min w-52 h-52 rounded rotate-[-40deg] bg-theme-red absolute bottom-0 left-0 -translate-x-full ease-out duration-450 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span className=" whitespace-nowrap relative w-full text-left min-w-min text-white transition-colors duration-300 ease-in-out group-hover:text-white">{cat}</span>
                        </button>
                    ))}
                </div>
            </header>
        </>)
};

export default Header;

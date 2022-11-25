import React from 'react'
import Image from 'next/image';
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';
// import { selectItems } from '../slices/basketSlice';

type Props = {
    products
}

const Header = ({ products }: Props) => {
    // const { data: session, status } = useSession()
    const router = useRouter()
    // const items = useSelector(selectItems)
    const categories = products.products.map(p => p.category).reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []).sort()
    // console.log(categories)


    return (
        <>
            <header>
                {/* top nav */}
                <div className='flex items-center justify-between p-1 flex-grow py-2'>
                    <div className='mt-2 pl-5 flex items-center flex-grow sm:flex-grow-0 mr-5'>
                        <Image
                            onClick={() => router.push("/")}
                            src='/pngaaa.com-1757256.png'
                            width={60}
                            height={60}
                            objectFit='contain'
                            className='cursor-pointer'
                            alt=''
                        />
                        <div className='text-theme-red text-2xl font-bold hidden sm:inline'>ITZI</div>
                    </div>
                    {/* search */}
                    <div className='hidden items-center sm:flex h-8 max-w-[550px] border rounded-md flex-grow cursor-pointer'>
                        <input
                            className='h-full flex-grow flex-shrink rounded-l-md focus:outline-none px-2'
                            type="text"
                        />
                        <SearchIcon
                            className='h-8 bg-theme-red text-white hover:bg-theme-blue p-1.5 rounded-r-md'
                        />
                    </div>

                    {/* right */}
                    <div className='text-white flex items-center text-xs space-x-4 mx-5 whitespace-nowrap'>
                        <div className='link' /*onClick={!session ? signIn : signOut}*/>
                            <p>
                                {/*session ? `Hello, ${session.user.name}` :*/ `Sign In`}
                            </p>
                            <p className='font-bold md:text-sm'>{`Account & Lists`}</p>
                        </div>

                        <div className='link'>
                            <p>Returns</p>
                            <p className='font-bold md:text-sm'>{`& Orders`}</p>
                        </div>

                        <div className='relative link flex items-center' onClick={() => router.push("checkout")}>
                            <span
                                className='absolute top-0 right-0 sm:right-9 bg-yellow-500 
                                rounded-full h-4 w-4 text-center text-black font-bold'>
                                {/* {items.length} */}
                                items here
                            </span>
                            <ShoppingCartIcon className='h-7' />
                            <p className='hidden sm:inline font-bold md:text-sm mt-3'>Basket</p>
                        </div>
                    </div>
                </div>

                {/* bottom nav */}
                <div
                    className='flex items-center bg-amazon_blue-light text-sm text-white
                    space-x-3 mx-2 p-1 sm:overflow-x-scroll scrollbar-thin scrollbar-thumb-theme-red'>
                    <MenuIcon className='inline sm:hidden h-6 mr-2' />
                    {categories.map((cat: string, i: number) => (
                        <a key={i} href="#_" className="min-w-min sm:relative hidden sm:inline-flex items-center justify-start px-3 py-1 bg-theme-blue overflow-hidden font-medium transition-all  rounded hover:bg-white group">
                            <span className="min-w-min w-52 h-52 rounded rotate-[-40deg] bg-theme-red absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span className=" whitespace-nowrap relative w-full text-left min-w-min text-white transition-colors duration-300 ease-in-out group-hover:text-white">{cat}</span>
                        </a>
                    ))}
                </div>
            </header>
        </>)
};

export default Header;

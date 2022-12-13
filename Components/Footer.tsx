import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGooglePlay, faAppStoreIos } from '@fortawesome/free-brands-svg-icons'

type Props = {}

const Footer = (props: Props) => {
  return (
    <>
      <footer className='bg-slate-300 m-auto flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-10 py-6  max-w-[1100px]'>

          {/* first column */}
          <div className='mb-5 space-y-1'>
            <h1 className='font-bold mb-2'>Mitzi</h1>
            <div className='flex items-center content-center'>
              <FontAwesomeIcon icon={faGooglePlay} className='mr-2 h-5' />
              <span>Google Play</span>
            </div>

            <div className='flex items-center content-center'>
              <FontAwesomeIcon icon={faAppStoreIos} className='mr-2 h-5' />
              <span>App Store</span>
            </div>
          </div>

          {/* second column */}
          <div className='mb-5'>
            <h2 className='font-bold mb-2'>About Us</h2>
            <ul className='space-y-1'>
              <li className='hover:underline cursor-pointer w-fit'>Careers</li>
              <li className='hover:underline cursor-pointer w-fit'>Our Stores</li>
              <li className='hover:underline cursor-pointer w-fit'>Become a Mitzi Seller</li>
              <li className='hover:underline cursor-pointer w-fit'>Terms & Conditions</li>
              <li className='hover:underline cursor-pointer w-fit'>Privacy Policy</li>
            </ul>
          </div>

          {/* third column */}
          <div className='mb-5'>
            <h2 className='font-bold mb-2'>Customer Care</h2>
            <ul className='space-y-1'>
              <li className='hover:underline cursor-pointer w-fit'>Help Center </li>
              <li className='hover:underline cursor-pointer w-fit'>How to Buy </li>
              <li className='hover:underline cursor-pointer w-fit'>Track Your Order </li>
              <li className='hover:underline cursor-pointer w-fit'>Corporate & Bulk Purchasing </li>
              <li className='hover:underline cursor-pointer w-fit'>Returns & Refunds </li>
            </ul>
          </div>

          {/* fourth column */}
          <div className='mb-5'>
            <h2 className='font-bold mb-2'>Contact Us</h2>
            <ul className='space-y-1'>
              <li>101 Developer Avenue, New York, NY 10012, United States </li>
              <li>Email: matthew_s_harrison@yahoo.com</li>
              <li>Phone: +1 1123 456 789</li>
            </ul>
          </div>

        </div>
      </footer>

      {/* bottom footer */}
      <footer className='bg-slate-500' >

        <div className=' m-auto flex justify-between max-w-[1100px] px-10 text-sm text-white py-1'>
          <div className=''>&#169;{`${new Date().getFullYear()} Mitzi`}</div>
          <div></div>
          <div></div>

          <div className='flex'>
            <div className='border-r mr-2 pr-2'>Cookies</div>
            <div>Accessibility</div>
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer
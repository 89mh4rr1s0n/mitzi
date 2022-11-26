import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {}

const Banner = (props: Props) => {
  return (
    <div className='mx-10'>
      <div className='relative max-w-[1800px] m-auto'>
        <div
          className='absolute w-full h-32 
      bg-gradient-to-t from-slate-400 via-slate-400 to-transparent bottom-0 z-10' />
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
        >
          <div>
            <img loading="lazy" src="/imageedit_21_7913295270.png" alt='' />
          </div>
          <div>
            <img loading="lazy" src="/imageedit_7_8878908647.png" alt='' />
          </div>
          <div>
            <img loading="lazy" src="/imageedit_10_7495570295.png" alt='' />
          </div>
          <div>
            <img loading="lazy" src="/imageedit_29_8201591548.png" alt=''/>
        </div>
        <div>
            <img loading="lazy" src="/imageedit_33_9377198260.png" alt=''/>
        </div>
        <div>
          <img loading='lazy' src='/imageedit_38_5143917227.png' alt=''/>
        </div>
        </Carousel>
      </div>
    </div>
  )
}

export default Banner
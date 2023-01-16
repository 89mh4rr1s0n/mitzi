import { useState, useRef, useEffect } from "react";
import SmallProductCard from './SmallProductCard'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { Product } from "../typings";
import { useWindowSize } from '../utils/utils';

type Props = {
  title: string,
  products: Product[]
}

const Homefeed2 = ({ products, title }: Props) => {

  let scrl = useRef(document.createElement("div"));
  const [scrollX, setscrollX] = useState<number>(0);
  const [scrolEnd, setscrolEnd] = useState<boolean>(false);
  const [arrowsVisible, setArrowsVisible] = useState<boolean>(false)
  const [width, height] = useWindowSize()

  const easeInOutQuad = (t: number, b: number, c: number, d: number):number => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const scrollLeft = (element: { scrollLeft: any; }, change: number, duration: number) => {
    var start = element.scrollLeft,
      currentTime = 0,
      increment = 20;

    const animateScroll = () => {
      currentTime += increment;
      let val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  useEffect(() => {
    //Check width of the scollings
    if (
      scrl.current &&
      scrl?.current?.scrollWidth === scrl?.current?.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
    return () => { };
  }, [scrl?.current?.scrollWidth, scrl?.current?.offsetWidth]);

  return (
    <div className="mb:mx-10">
      <div className="bg-slate-300 m-auto z-20 max-w-[1800px] mb:rounded-lg pt-4 mb:pt-0 mb:mt-10"
        onMouseEnter={() => setArrowsVisible(true)}
        onMouseLeave={() => setArrowsVisible(false)}>

        <div className='mx-3 mb:my-1 translate-y-2 z-20 text-white relative bg-theme-red rounded-md w-fit px-4'>{title}</div>

        <div className="relative pt-3 flex">


          {/* scroll left button/ */}
          {scrollX !== 0 && arrowsVisible && (
            <button
              className="absolute top-1/3 h-24 w-10 rounded-r-md z-50 text-white
              bg-theme-blue shadow-lg border border-white"
              onClick={() => scrollLeft(scrl.current, -width * 0.65, 200)}
            >
              <ChevronLeftIcon className='h-8 w-8 bg-theme-blue' />
            </button>
          )}


          {/* items */}
          <div className="flex overflow-x-scroll scrollbar-thin
          scrollbar-thumb-theme-red pb-2 mx-0" ref={scrl} onScroll={scrollCheck}>
            {products.map((product, i) => (
              <SmallProductCard
                key={i}
                itemNo={product.id}
                description={product.description}
                thumbnail={product.thumbnail}
                discount={product.discountPercentage}
                rating={product.rating}
              />
            ))}
          </div>


          {/* scroll right button */}
          {!scrolEnd && arrowsVisible && (
            <button
              className="absolute right-0 top-1/3 h-24 w-10 text-white z-50
              bg-theme-blue shadow-lg border border-white rounded-l-md"
              onClick={() => scrollLeft(scrl.current, width * 0.65, 200)}
            >
              <ChevronRightIcon className='h-8 w-8 bg-theme-blue' />
            </button>
          )}


        </div>
      </div>
    </div>
  );
}

export default Homefeed2

import { useState, useRef, useEffect } from "react";
import SmallProductCard from './SmallProductCard'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const Homefeed2 = ({ products, title }: Props) => {

  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const [arrowsVisible, setArrowsVisible] = useState(false)

  Math.easeInOutQuad = function (t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  function scrollLeft(element, change, duration) {
    var start = element.scrollLeft,
      currentTime = 0,
      increment = 20;

    // console.log(start)

    var animateScroll = function () {
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

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
    <div className="mx-10">
      <div className="bg-slate-300 m-auto z-20 max-w-[1800px] rounded-lg mt-10"
        onMouseEnter={() => setArrowsVisible(true)}
        onMouseLeave={() => setArrowsVisible(false)}>

        <div className='mx-3 my-1 translate-y-2 z-20 text-white relative bg-theme-red rounded-md w-fit px-4'>{title}</div>

        <div className="relative pt-3 flex">


          {/* scroll left button/ */}
          {scrollX !== 0 && arrowsVisible && (
            <button
              className="absolute top-0 bottom-0 z-50 text-white
              bg-gradient-to-t from-transparent via-gray-900/40 to-transparent hover:via-gray-900/60"
              // onClick={() => slide(-150)}
              onClick={() => scrollLeft(scrl.current, -400, 200)}
            >
              <ChevronLeftIcon className='h-7 w-7 mb-16' />
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
              className="absolute right-0 top-0 bottom-0 text-white z-50
              bg-gradient-to-t from-transparent via-gray-900/40 to-transparent hover:via-gray-900/60"
              onClick={() => scrollLeft(scrl.current, 400, 200)}
            >
              <ChevronRightIcon className='h-7 w-7 mb-16' />
            </button>
          )}


        </div>
      </div>
    </div>
  );
}

export default Homefeed2

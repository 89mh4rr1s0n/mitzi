import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import SmallProductCard from './SmallProductCard'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const Homefeed2 = ({ products, title }: Props) => {
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const [arrowsVisible, setArrowsVisible] = useState(false)

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

  //Anim
  const anim = (e) => {
    gsap.from(e.target, { scale: 1 });
    gsap.to(e.target, { scale: 1 });
  };
  const anim2 = (e) => {
    gsap.from(e.target, { scale: 1 });
    gsap.to(e.target, { scale: 1 });
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
              onClick={() => slide(-150)}
              onMouseEnter={(e) => anim(e)}
              onMouseLeave={(e) => anim2(e)}
            >
              <ChevronLeftIcon className='h-7 w-7 mb-16' />
            </button>
          )}


          <div className="flex overflow-x-scroll scrollbar-thin snap-x snap-mandatory
          scrollbar-thumb-theme-red pb-2 mx-7" ref={scrl} onScroll={scrollCheck}>
            {products.map((product) => (
              <SmallProductCard
                key={product.id}
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
              onClick={() => slide(+150)}
              onMouseEnter={(e) => anim(e)}
              onMouseLeave={(e) => anim2(e)}
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

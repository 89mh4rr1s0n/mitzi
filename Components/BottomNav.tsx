import { useState, useRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux';
import { updateCategories } from '../slices/filtersSlice'
import { useRouter } from "next/router";
import { useWindowSize } from '../utils/utils';

type Props = {
  values: []
}

const BottomNav = ({ values }: Props) => {

  const router = useRouter();
  const dispatch = useDispatch();
  let scrl = useRef(document.createElement("div"));
  const [scrollX, setscrollX] = useState<number>(0);
  const [scrolEnd, setscrolEnd] = useState<boolean>(false);
  const [arrowsVisible, setArrowsVisible] = useState<boolean>(false)
  const [width, height] = useWindowSize()

  const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const searchCategory = (categoryName: string) => {
    dispatch(updateCategories([categoryName]))
    router.push({
      pathname: "/products",
      query: {
        category: [categoryName]
      }
    })
  }

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
    <div>
      <div className="bg-slate-300 z-20 text-sm"
        onMouseEnter={() => setArrowsVisible(true)}
        onMouseLeave={() => setArrowsVisible(false)}>


        <div className="relative flex ">


          {/* scroll left button/ */}
          {scrollX !== 0 && arrowsVisible && (
            <button
              className="absolute top-0 bottom-2 w-6 z-50 bg-slate-300"
              onClick={() => scrollLeft(scrl.current, -width * 0.65, 200)}
            >
              <ChevronLeftIcon className='h-6 w-6 bg-slate-300 text-black mt-1' />
            </button>
          )}


          {/* items */}
          <div className="flex overflow-x-scroll scrollbar-thin pt-2 pb-3 px-5
          scrollbar-thumb-theme-red space-x-2" ref={scrl} onScroll={scrollCheck}>
            {values.map((value: string, i: number) => (
              <button key={i} onClick={() => searchCategory(value)} className="min-w-min relative inline-flex items-center justify-start px-3 py-1 bg-theme-blue overflow-hidden font-medium transition-all  rounded hover:bg-white group">
                <span className="min-w-min w-52 h-52 rounded rotate-[-40deg] bg-theme-red absolute bottom-0 left-0 -translate-x-full ease-out duration-450 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className=" whitespace-nowrap relative w-full text-left min-w-min text-white transition-colors duration-300 ease-in-out group-hover:text-white">{value}</span>
              </button>
            ))}
          </div>


          {/* scroll right button */}
          {!scrolEnd && arrowsVisible && (
            <button
              className="absolute right-0 top-0 bottom-2 w-6 z-50
              bg-slate-300 "
              onClick={() => scrollLeft(scrl.current, width * 0.65, 200)}
            >
              <ChevronRightIcon className='h-6 w-6 bg-slate-300 text-black mt-1' />
            </button>
          )}


        </div>
      </div>
    </div>
  );
}

export default BottomNav
import React, { useState } from 'react'
import useCollapse from 'react-collapsed'
import { ChevronDownIcon } from "@heroicons/react/outline";

type Props = {
  values: [],
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
  checkerArr: []
}

const CheckboxFilterColumn = ({ values, onChange, checkerArr }: Props) => {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  return (<>
    {values.slice(0, 5).map((value, i) => (
      <div key={i} className='flex'>
        <input value={value} id={value} name={value} type="checkbox" onChange={onChange}
          checked={checkerArr.filter(i => i === value).includes(value)}
        />
        <span className='ml-2 whitespace-nowrap line-clamp-1'>{value}</span>
      </div>
    ))}

    {values.length > 5 && <>

      <section {...getCollapseProps()}>

        {values.slice(5, -1).map((value, i) => (
          <div key={i} className='flex'>
            <input value={value} id={value} name={value} type="checkbox" onChange={onChange}
              checked={checkerArr.filter(i => i === value).includes(value)}
            />
            <span className='ml-2 whitespace-nowrap line-clamp-1'>{value}</span>
          </div>
        ))}

      </section>

      <button className='text-center w-full hover:underline text-sm rounded-md border-zinc-300
      flex items-end justify-center border mt-1'
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        {isExpanded ? 'Show Less' : 'Show More'}
        <span><ChevronDownIcon className={`h-4 ${isExpanded && 'rotate-180'} transition-all duration-400`} /></span>
      </button>

    </>}


  </>)
}

export default CheckboxFilterColumn
import React, { useState } from 'react'
import useCollapse from 'react-collapsed'

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

      <button className='text-center w-full hover:underline text-sm'
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>

    </>}


  </>)
}

export default CheckboxFilterColumn
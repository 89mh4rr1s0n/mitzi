/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type Props = {
  value: string
  field: string
}

const Checkbox = ({ value, field }: Props) => {

  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    if (!isChecked) {
      if ([router.query[field]]?.filter(i => i === value).includes(value)) {
        const index = [router.query[field]].indexOf(value)
        if (index > -1) { // only splice array when item is found
          [router.query[field]].splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    } else if (isChecked) {
      if (![router.query[field]]?.filter(i => i === value).includes(value)) {
        [router.query[field]].push(value)
      }
    }
  }, [isChecked, router.query])

  return (
    <div className='flex items-center content-center'>
      <input
        type="checkbox"
        id={value}
        name={value}
        value={value}
        defaultChecked={[router.query[field]]?.filter(i => i === value).includes(value)}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label
        className='ml-2'
        >
        {value}
      </label>
    </div>
  )
}

export default Checkbox
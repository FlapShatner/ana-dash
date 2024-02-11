import React, { useEffect } from 'react'
import { DateRangePicker } from '@tremor/react'
import { useAtom, useAtomValue } from 'jotai'
import { rangeAtom, sortedDataAtom } from '@/atoms'

type DatesProps = {}

function Dates() {
 const [range, setRange] = useAtom(rangeAtom)
 const sortedData = useAtomValue(sortedDataAtom)
 const maxDate = new Date(sortedData[sortedData.length - 1]?.publishTime)

 useEffect(() => {
  setRange({
   from: sortedData.length > 0 ? new Date(sortedData[0]?.publishTime) : null,
   to: sortedData.length > 0 ? new Date(sortedData[sortedData.length - 1]?.publishTime) : null,
  })
 }, [sortedData])

 return (
  <div className='w-full flex mb-4 justify-end'>
   <DateRangePicker
    value={range}
    onValueChange={setRange}
    enableSelect={false}
    maxDate={maxDate}
   />
  </div>
 )
}

export default Dates

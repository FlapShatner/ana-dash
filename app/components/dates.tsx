import React, { useEffect } from 'react'
import { DateRangePicker } from '@tremor/react'
import { useAtom, useAtomValue } from 'jotai'
import { endRangeAtom, sortedDataAtom, startRangeAtom } from '@/atoms'

type DatesProps = {
 isEnd: boolean
}

function Dates({ isEnd }: DatesProps) {
 const [endRange, setEndRange] = useAtom(endRangeAtom)
 const [startRange, setStartRange] = useAtom(startRangeAtom)
 const sortedData = useAtomValue(sortedDataAtom)
 const maxDate = new Date(sortedData[sortedData.length - 1]?.publishTime)

 useEffect(() => {
  if (isEnd) {
   setEndRange({
    from: sortedData.length > 0 ? new Date(sortedData[0]?.publishTime) : null,
    to: sortedData.length > 0 ? new Date(sortedData[sortedData.length - 1]?.publishTime) : null,
   })
  } else {
   setStartRange({
    from: sortedData.length > 0 ? new Date(sortedData[0]?.publishTime) : null,
    to: sortedData.length > 0 ? new Date(sortedData[sortedData.length - 1]?.publishTime) : null,
   })
  }
 }, [sortedData])

 return (
  <div className='w-full flex mb-4 justify-end'>
   <DateRangePicker
    value={isEnd ? endRange : startRange}
    onValueChange={isEnd ? setEndRange : setStartRange}
    enableSelect={false}
    maxDate={maxDate}
   />
  </div>
 )
}

export default Dates

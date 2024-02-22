import React, { useEffect } from 'react'
import { DateRangePicker } from '@tremor/react'
import { useAtom, useAtomValue } from 'jotai'
import { endRangeAtom, sortedDataAtom, startRangeAtom, endInputAtom, startInputAtom } from '@/atoms'

type DatesProps = {
 isEnd: boolean
}

function Dates({ isEnd }: DatesProps) {
 const [endRange, setEndRange] = useAtom(endRangeAtom)
 const [startRange, setStartRange] = useAtom(startRangeAtom)
 const endInput = useAtomValue(endInputAtom)
 const startInput = useAtomValue(startInputAtom)
 //  const sortedData = useAtomValue(sortedDataAtom)

 const maxDate = isEnd ? new Date(endInput[endInput.length - 1]?.publishTime) : new Date(startInput[startInput.length - 1]?.publishTime)

 useEffect(() => {
  if (isEnd) {
   setEndRange({
    from: endInput.length > 0 ? new Date(endInput[0]?.publishTime) : null,
    to: endInput.length > 0 ? new Date(endInput[endInput.length - 1]?.publishTime) : null,
   })
  } else {
   setStartRange({
    from: startInput.length > 0 ? new Date(startInput[0]?.publishTime) : null,
    to: startInput.length > 0 ? new Date(startInput[startInput.length - 1]?.publishTime) : null,
   })
  }
 }, [endInput, startInput])

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

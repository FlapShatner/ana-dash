import React, { useState } from 'react'
import { DateRangePicker, DateRangePickerValue, DateRangePickerItem, DateRangePickerItemProps, DateRangePickerProps } from '@tremor/react'
import { useAtom } from 'jotai'
import { rangeAtom, sortedDataAtom } from '@/atoms'

type DatesProps = {}

function Dates() {
 const [range, setRange] = useAtom<DateRangePickerValue>(rangeAtom)
 const [sortedData, setSortedData] = useAtom(sortedDataAtom)
 const maxDate = new Date(sortedData[sortedData.length - 1]?.publishTime)
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

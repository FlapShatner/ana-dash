import { FC, useState } from 'react'
import { cn } from '@/utils'
import { Card } from '@tremor/react'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/16/solid'
import { useAtomValue } from 'jotai'
import { endRangeAtom, endInputAtom, startRangeAtom } from '@/atoms'

interface ChangeProps {
 data: any
 prevData: any
 selectedKpi: string
}

const Change: FC<ChangeProps> = ({ data, selectedKpi, prevData }) => {
 const [extraInfo, setExtraInfo] = useState(false)
 const endRange = useAtomValue(endRangeAtom)
 const startRange = useAtomValue(startRangeAtom)
 const endInput = useAtomValue(endInputAtom)
 if (data.length === 0) return null
 const prevSum = prevData.reduce((acc: number, item: any) => acc + item[selectedKpi], 0)
 const sum = data.reduce((acc: number, item: any) => acc + item[selectedKpi], 0)
 //  console.log('data', data)
 //  console.log('prevData', prevData)
 //  const endValue = data[data.length - 1][selectedKpi]
 //  const startValue = data[0][selectedKpi]
 const change = sum - prevSum
 const changeLabel = Math.abs(change)
 const changePercentage = ((change / prevSum) * 100).toFixed(1)
 const changeUp = change > 0

 const date = ` ${new Date((endRange as { from: string }).from).toLocaleDateString('en-us', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
 })} - ${new Date((endRange as { to: string }).to).toLocaleDateString('en-us', { year: '2-digit', month: '2-digit', day: '2-digit' })}`

 const prevDate = ` ${new Date((startRange as { from: string }).from).toLocaleDateString('en-us', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
 })} - ${new Date((startRange as { to: string }).to).toLocaleDateString('en-us', { year: '2-digit', month: '2-digit', day: '2-digit' })}`

 return (
  //   <p>hi</p>
  <Card className='w-max px-8 pt-2 m-auto'>
   {endInput.length > 0 && <p className='text-center mb-2 mt-4'>{date}</p>}
   <h2 className='text-tremor-title text-tremor-content dark:text-dark-tremor-content'>{selectedKpi}</h2>
   <div>
    <p className='mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>{sum}</p>
    <p className={cn('mt-1 text-tremor-default font-medium flex items-center', changeUp ? 'text-emerald-500' : 'text-red-600')}>
     {changeUp ? <ArrowUpIcon className='h-4 w-4 text-green-500' /> : <ArrowDownIcon className='h-4 w-4 text-red-500' />} {changeLabel} ({changePercentage}%)
    </p>
    <div>
     {extraInfo && (
      <>
       <p className='text-dark-tremor-content-subtle mt-2'>from {prevSum}</p>
       <p className='text-dark-tremor-content-subtle'>{prevDate}</p>
      </>
     )}
     <button
      className='text-tremor-content-subtle underline'
      onClick={() => {
       setExtraInfo(!extraInfo)
      }}>
      {extraInfo ? 'less' : 'more'}
     </button>
    </div>
   </div>
  </Card>
 )
}

export default Change

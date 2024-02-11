import { FC } from 'react'
import { cn } from '@/utils'
import { Card } from '@tremor/react'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/16/solid'

interface ChangeProps {
 data: any
 selectedKpi: string
}

const Change: FC<ChangeProps> = ({ data, selectedKpi }) => {
 if (!data.length) return null
 const endValue = data[data.length - 1][selectedKpi]
 const startValue = data[0][selectedKpi]
 const change = endValue - startValue
 const changeLabel = Math.abs(change)
 const changePercentage = ((change / startValue) * 100).toFixed(1)
 const changeUp = change > 0
 const sum = data.reduce((acc: number, item: any) => acc + item[selectedKpi], 0)
 return (
  <Card className='w-max px-8 pt-2 m-auto'>
   <h2 className='text-tremor-title text-tremor-content dark:text-dark-tremor-content'>{selectedKpi}</h2>
   <div>
    <p className='mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>{sum}</p>
    <p className={cn('mt-1 text-tremor-default font-medium flex items-center', changeUp ? 'text-emerald-500' : 'text-red-600')}>
     {changeUp ? <ArrowUpIcon className='h-4 w-4 text-green-500' /> : <ArrowDownIcon className='h-4 w-4 text-red-500' />} {changeLabel} ({changePercentage}%)
    </p>
   </div>
  </Card>
 )
}

export default Change

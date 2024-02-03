import { FC } from 'react'
import { Card, LineChart, Title } from '@tremor/react'
import { getDataPoint } from '@/utils'
import { Idata, dataObjectType } from '@/types'

interface GraphProps {
 data: dataObjectType[]
}

const Graph: FC<GraphProps> = ({ data }) => {
 const dataArr = data.map((item) => {
  return getDataPoint(item)
 })

 const sortedData = dataArr.sort((a, b) => {
  return Date.parse(a.publishTime) - Date.parse(b.publishTime)
 })

 const graphData = sortedData.map((item) => {
  return {
   Date: item.publishTime,
   Reach: item.reach,
   Comments: item.comments,
   Impressions: item.impressions,
   Follows: item.follows,
   Likes: item.likes,
   Shares: item.shares,
  }
 })

 const customTooltip = ({ payload, active, label }: any) => {
  if (!active || !payload) return null
  const dateLabel = new Intl.DateTimeFormat('en', {
   timeStyle: 'short',
   dateStyle: 'short',
  }).format(new Date(label))
  return (
   <div className='w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border'>
    {payload.map((category: any, idx: any) => (
     <div
      key={idx}
      className='flex flex-1 space-x-2.5'>
      <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
      <div className='space-y-1'>
       <p className='text-tremor-content'>{category.dataKey}</p>
       <p className='font-medium text-tremor-content-emphasis'>{dateLabel}</p>
       <p className='font-medium text-tremor-content-emphasis'>{category.value}</p>
      </div>
     </div>
    ))}
   </div>
  )
 }

 return (
  <Card>
   <Title>Reach</Title>
   <LineChart
    data={graphData}
    index='Date'
    categories={['Reach']}
    customTooltip={customTooltip}
   />
  </Card>
 )
}

export default Graph

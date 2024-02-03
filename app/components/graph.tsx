import { FC, useState } from 'react'
import { Card, LineChart, Title, Color, Flex, Icon, Tab, TabGroup, TabList, Text, ValueFormatter } from '@tremor/react'
import { getDataPoint } from '@/utils'
import { Idata, dataObjectType } from '@/types'

interface GraphProps {
 data: dataObjectType[]
}

type GraphData = {
 Date: string
 Reach: number
 Comments: number
 Impressions: number
 Follows: number
 Likes: number
 Shares: number
}

const Graph: FC<GraphProps> = ({ data }) => {
 const dataArr = data.map((item) => {
  return getDataPoint(item)
 })

 const sortedData = dataArr.sort((a, b) => {
  return Date.parse(a.publishTime) - Date.parse(b.publishTime)
 })

 const dateLabel = (date: string) =>
  new Intl.DateTimeFormat('en', {
   timeStyle: 'short',
   dateStyle: 'short',
  }).format(new Date(date))

 const graphData = sortedData.map((item) => {
  return {
   Date: dateLabel(item.publishTime),
   Reach: item.reach,
   Comments: item.comments,
   Impressions: item.impressions,
   Follows: item.follows,
   Likes: item.likes,
   Shares: item.shares,
  }
 })

 const Kpis = {
  Reach: 'Reach',
  Comments: 'Comments',
  Impressions: 'Impressions',
  Follows: 'Follows',
  Likes: 'Likes',
  Shares: 'Shares',
 }

 const kpiList = Object.keys(Kpis)

 const [selectedIndex, setSelectedIndex] = useState(0)
 const selectedKpi = kpiList[selectedIndex]

 const customTooltip = ({ payload, active, label }: any) => {
  if (!active || !payload) return null

  return (
   <div className='w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border'>
    {payload.map((category: any, idx: any) => (
     <div
      key={idx}
      className='flex flex-1 space-x-2.5'>
      <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
      <div className='space-y-1'>
       <p className='text-tremor-content'>{category.dataKey}</p>
       <p className='font-medium text-tremor-content-emphasis'>{label}</p>
       <p className='font-medium text-tremor-content-emphasis'>{category.value}</p>
      </div>
     </div>
    ))}
   </div>
  )
 }

 const chartArgs = {
  data: graphData,
  index: 'Date',
  categories: [selectedKpi],
  customTooltip: customTooltip,
 }

 return (
  <Card className='h-[60vh]'>
   <div className='flex justify-between'>
    <Title>KPIs Over Time</Title>
    <div>
     <TabGroup
      index={selectedIndex}
      onIndexChange={setSelectedIndex}>
      <TabList
       color='gray'
       variant='solid'>
       {kpiList.map((kpi, index) => (
        <Tab key={index}>
         <Text>{kpi}</Text>
        </Tab>
       ))}
      </TabList>
     </TabGroup>
    </div>
   </div>
   <LineChart {...chartArgs} />
  </Card>
 )
}

export default Graph

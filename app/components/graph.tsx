import { FC, use, useEffect, useState } from 'react'
import Dates from './dates'
import CustomTooltip from './customToolTip'
import { Card, LineChart, Title, Color, Flex, Icon, Tab, TabGroup, TabList, Text, ValueFormatter, DateRangePickerValue } from '@tremor/react'
import { dataPointType, getDataPoint, getFormattedData } from '@/utils'
import { lastWeekDate, dateLabel, filterByDateRange } from '@/dateUtils'
import { useAtom } from 'jotai'
import { rangeAtom, inputDataAtom, sortedDataAtom } from '@/atoms'
import { Idata, dataObjectType } from '@/types'

interface GraphProps {}

const Graph: FC<GraphProps> = () => {
 const [inputData, setInputData] = useAtom(inputDataAtom)
 const [range, setRange] = useAtom(rangeAtom)
 const [sortedData, setSortedData] = useAtom(sortedDataAtom)

 useEffect(() => {
  const data: dataObjectType[] = inputData?.data || []
  setSortedData(getFormattedData(data))
 }, [inputData])
 //  const sortedData = getFormattedData(data)

 const filtered = filterByDateRange(sortedData, (range as { from?: Date }).from || new Date(), (range as { to?: Date }).to || new Date())

 const graphData = filtered.map((item) => {
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

 const chartArgs = {
  data: graphData,
  index: 'Date',
  categories: [selectedKpi],
  customTooltip: CustomTooltip,
 }

 return (
  <Card className='h-[60vh]'>
   <div className='flex justify-between'>
    <Title>KPIs Over Time</Title>
    <div>
     <Dates />
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

import { FC, useEffect } from 'react'
import Dates from './dates'
import CustomTooltip from './customToolTip'
import Tabs from './tabs'
import { Card, LineChart } from '@tremor/react'
import { getFormattedData } from '@/utils'
import { dateLabel, filterByDateRange } from '@/dateUtils'
import { useAtom, useAtomValue } from 'jotai'
import { endRangeAtom, inputDataAtom, sortedDataAtom, selectedIndexAtom } from '@/atoms'
import { dataObjectType } from '@/types'
import Change from './change'

interface ContentProps {}

const Content: FC<ContentProps> = () => {
 const inputData = useAtomValue(inputDataAtom)
 const endRange = useAtomValue(endRangeAtom)
 const [sortedData, setSortedData] = useAtom(sortedDataAtom)

 useEffect(() => {
  const data: dataObjectType[] = inputData?.data || []
  setSortedData(getFormattedData(data))
 }, [inputData])

 console.log('sortedData', sortedData)

 const filtered = filterByDateRange(sortedData, (endRange as { from?: Date }).from || new Date(), (endRange as { to?: Date }).to || new Date())

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
  Impressions: 'Impressions',
  Follows: 'Follows',
  Likes: 'Likes',
 }

 const kpiList = Object.keys(Kpis)
 const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom)
 const selectedKpi = kpiList[selectedIndex]

 const chartArgs = {
  data: graphData,
  index: 'Date',
  categories: [selectedKpi],
  customTooltip: CustomTooltip,
 }

 return (
  <Card>
   <div className='flex flex-col items-end mb-2'>
    <div>
     <Tabs kpiList={kpiList} />
    </div>
   </div>
   <Change
    data={graphData}
    selectedKpi={selectedKpi}
   />
   {/* <LineChart {...chartArgs} /> */}
  </Card>
 )
}

export default Content

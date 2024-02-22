import { FC, useEffect } from 'react'
import Dates from './dates'
import CustomTooltip from './customToolTip'
import Tabs from './tabs'
import { Card, LineChart } from '@tremor/react'
import { getFormattedData } from '@/utils'
import { dateLabel, filterByDateRange } from '@/dateUtils'
import { useAtom, useAtomValue } from 'jotai'
import { startInputAtom, endInputAtom, selectedIndexAtom, endRangeAtom } from '@/atoms'
import { dataObjectType } from '@/types'
import Change from './change'

interface ContentProps {}

const Content: FC<ContentProps> = () => {
 const startInput = useAtomValue(startInputAtom)
 const endInput = useAtomValue(endInputAtom)
 const endRange = useAtomValue(endRangeAtom)

 const startGraphData = startInput.map((item) => {
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

 const endGraphData = endInput.map((item) => {
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

 //  const chartArgs = {
 //   data: graphData,
 //   index: 'Date',
 //   categories: [selectedKpi],
 //   customTooltip: CustomTooltip,
 //  }

 const date = ` ${new Date((endRange as { from: string }).from).toLocaleDateString('en-us', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
 })} - ${new Date((endRange as { to: string }).to).toLocaleDateString('en-us', { year: '2-digit', month: '2-digit', day: '2-digit' })}`

 return (
  <Card>
   <div className='flex flex-col items-end mb-2'>
    <div>
     <Tabs kpiList={kpiList} />
    </div>
   </div>
   {endInput.length > 0 && <p className='text-center mb-2 mt-4'>{date}</p>}
   <Change
    data={endGraphData}
    prevData={startGraphData}
    selectedKpi={selectedKpi}
   />
  </Card>
 )
}

export default Content

import { FC, useEffect } from 'react'
import Dates from './dates'
import CustomTooltip from './customToolTip'
import Tabs from './tabs'
import { Card, LineChart } from '@tremor/react'
import { getFormattedData } from '@/utils'
import { dateLabel, filterByDateRange } from '@/dateUtils'
import { useAtom, useAtomValue } from 'jotai'
import { startInputAtom, endInputAtom, selectedIndexAtom, endRangeAtom, startRangeAtom, startRangeDataAtom, endRangeDataAtom } from '@/atoms'
import { dataObjectType } from '@/types'
import Change from './change'

interface ContentProps {}

const Content: FC<ContentProps> = () => {
 const startInput = useAtomValue(startInputAtom)
 const endInput = useAtomValue(endInputAtom)
 const endRange = useAtomValue(endRangeAtom)
 const startRange = useAtomValue(startRangeAtom)
 //  const startRangeData = useAtomValue(startRangeDataAtom)
 //  const endRangeData = useAtomValue(endRangeDataAtom)
 const [startRangeData, setStartRangeData] = useAtom(startRangeDataAtom)
 const [endRangeData, setEndRangeData] = useAtom(endRangeDataAtom)

 useEffect(() => {
  if (endInput.length === 0 || startInput.length === 0) return
  const endRangeData = filterByDateRange(endInput, new Date((endRange as { from: string }).from), new Date((endRange as { to: string }).to))
  const startRangeData = filterByDateRange(startInput, new Date((startRange as { from: string }).from), new Date((startRange as { to: string }).to))
  setEndRangeData(endRangeData)
  setStartRangeData(startRangeData)
 }, [endRange, startRange, startInput, endInput])

 const startGraphData = startRangeData.map((item) => {
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

 const endGraphData = endRangeData.map((item) => {
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

 const prevDate = ` ${new Date((startRange as { from: string }).from).toLocaleDateString('en-us', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
 })} - ${new Date((startRange as { to: string }).to).toLocaleDateString('en-us', { year: '2-digit', month: '2-digit', day: '2-digit' })}`

 return (
  <Card>
   <div className='flex flex-col items-end mb-2'>
    <div>{/* <Tabs kpiList={kpiList} /> */}</div>
   </div>
   <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
    <Change
     data={endGraphData}
     prevData={startGraphData}
     selectedKpi={'Reach'}
    />
    <Change
     data={endGraphData}
     prevData={startGraphData}
     selectedKpi={'Impressions'}
    />
    <Change
     data={endGraphData}
     prevData={startGraphData}
     selectedKpi={'Follows'}
    />
    <Change
     data={endGraphData}
     prevData={startGraphData}
     selectedKpi={'Likes'}
    />
   </div>
   {/* {startInput.length > 0 && <p> {prevDate}</p>} */}
  </Card>
 )
}

export default Content

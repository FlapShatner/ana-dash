import { TabGroup, TabList, Tab, Text } from '@tremor/react'
import { FC } from 'react'
import { selectedIndexAtom } from '@/atoms'
import { useAtom } from 'jotai'

interface TabsProps {
 kpiList: string[]
}

const Tabs: FC<TabsProps> = ({ kpiList }) => {
 const [selectedIndex, setSelectedIndex] = useAtom(selectedIndexAtom)
 return (
  <TabGroup
   index={selectedIndex}
   onIndexChange={setSelectedIndex}>
   <TabList
    className='space-x-0 sm:space-x-1.5'
    color='gray'
    variant='solid'>
    {kpiList.map((kpi, index) => (
     <Tab
      className='px-2 sm:px-3'
      key={index}>
      <Text>{kpi}</Text>
     </Tab>
    ))}
   </TabList>
  </TabGroup>
 )
}

export default Tabs

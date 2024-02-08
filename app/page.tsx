'use client'
import { useState } from 'react'
import { useAtom } from 'jotai'
import Dropzone from './components/dropzone'
import { Idata, dataObjectType } from '@/types'
import Graph from './components/graph'
import { lastWeekDate } from '@/dateUtils'
import { DateRangePickerValue } from '@tremor/react'

export default function Home() {
 const [fileName, setFileName] = useState(null)

 return (
  <main className='bg-[#1b2741] flex min-h-screen flex-col items-center px-4 pb-8 sm:p-24 gap-4'>
   <Dropzone setFileName={setFileName} />
   <Graph />
  </main>
 )
}

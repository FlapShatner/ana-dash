'use client'
import { useAtomsDebugValue } from 'jotai-devtools'
import Upload from './components/upload'
import Content from './components/content'
import Dates from './components/dates'

export default function Home() {
 const DebugAtoms = () => {
  useAtomsDebugValue()
  return null
 }

 return (
  <main className='bg-dark-tremor-background-muted flex min-h-screen flex-col items-end pb-8 gap-4 pt-24 px-4 sm:px-8'>
   <DebugAtoms />
   <div className='flex gap-4'>
    <div className='flex flex-col gap-2'>
     <Upload isEnd={false} />
     <Dates isEnd={false} />
    </div>
    <div className='flex flex-col gap-2'>
     <Upload isEnd={true} />
     <Dates isEnd={true} />
    </div>
   </div>
   <Content />
  </main>
 )
}

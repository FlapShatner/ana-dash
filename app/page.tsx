'use client'
import Upload from './components/upload'
import Content from './components/Content'
import Dates from './components/dates'

export default function Home() {
 return (
  <main className='bg-dark-tremor-background-muted flex min-h-screen flex-col items-end pb-8 gap-4 pt-24 px-4 sm:px-8'>
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

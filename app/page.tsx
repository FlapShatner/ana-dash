'use client'
import Upload from './components/upload'
import Graph from './components/graph'

export default function Home() {
 return (
  <main className='bg-dark-tremor-background-muted flex min-h-screen flex-col items-end pb-8 gap-4 pt-24 px-4 sm:px-8'>
   <Upload />
   <Graph />
  </main>
 )
}

'use client'
import { useState } from 'react'
import Image from 'next/image'
import Dropzone from './components/dropzone'
import { Idata, dataObjectType } from '@/types'
import Graph from './components/graph'

export default function Home() {
 const [results, setResults] = useState({} as Idata | null)
 const [fileName, setFileName] = useState(null)

 results && console.log(results)
 const data: dataObjectType[] = results?.data || []
 console.log(data)

 return (
  <main className='bg-[#1b2741] flex min-h-screen flex-col items-center p-24 gap-4'>
   <Dropzone
    setResults={setResults}
    setFileName={setFileName}
   />
   <Graph data={data} />
  </main>
 )
}

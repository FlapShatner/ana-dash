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
  <main className='flex min-h-screen flex-col items-center p-24'>
   <h1>Hello</h1>
   <Dropzone
    setResults={setResults}
    setFileName={setFileName}
   />
   {/* <ul>
    {data.map((item, index) => (
     <li key={index}>{item && item['Publish time'] && Date.parse(item['Publish time'])}</li>
    ))}
   </ul> */}
   <Graph data={data} />
  </main>
 )
}

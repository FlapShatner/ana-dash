'use client'
import { useState, useEffect } from 'react'
import DeleteIcon from './icons/delete-icon'
import { useCSVReader, formatFileSize } from 'react-papaparse'
import { cn } from '@/utils'
import { useAtom } from 'jotai'
import { inputDataAtom } from '@/atoms'

export default function CSVReader({ setFileName }: any) {
 const { CSVReader } = useCSVReader()
 const [zoneHover, setZoneHover] = useState(false)
 const [showResults, setShowResults] = useState(false)
 const [inputData, setInputData] = useAtom(inputDataAtom)

 const config = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
 }

 const handleRemove = (e: any) => {
  e.stopPropagation()
  setInputData(null)
  setFileName(null)
  setShowResults(false)
 }

 return (
  <CSVReader
   config={config}
   onUploadAccepted={(results: any, file: any) => {
    setShowResults(true)
    setInputData(results)
    setZoneHover(false)
    setFileName(file.name)
   }}
   onDragOver={(event: DragEvent) => {
    event.preventDefault()
    setZoneHover(true)
   }}
   onDragLeave={(event: DragEvent) => {
    event.preventDefault()
    setZoneHover(false)
   }}>
   {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps, Remove }: any) => (
    <>
     <div
      className={cn(
       'cursor-pointer border-2 border-dashed border-slate-400 mt-2 py-8 md:w-[500px] w-11/12 rounded-xl text-center',
       acceptedFile && showResults && 'p-0 border-none'
      )}
      {...getRootProps()}>
      {acceptedFile && showResults ? (
       <>
        <div className={cn('bg-gradient-to-b from-gray-50 to-gray-300 rounded-2xl flex h-20 md:w-96 relative z-10 flex-col justify-center m-auto')}>
         <div className='flex flex-col items-center px-[10px]'>
          <span className='bg-grey-40 rounded-sm mb-2 flex justify-center text-gray-800'>{formatFileSize(acceptedFile.size)}</span>
          <span className='bg-grey-40 rounded-sm text-xs mb-2 text-gray-900'>{acceptedFile.name}</span>
         </div>
         <div className='w-full px-[10px]'>
          <ProgressBar />
         </div>
         <div {...getRemoveFileProps()}>
          <div
           onClick={(e) => handleRemove(e)}
           className='absolute h-[23px] w-[23px] right-[8px] top-[6px]'>
           <DeleteIcon />
           {/* <Remove color='#A01919' /> */}
          </div>
         </div>
        </div>
       </>
      ) : (
       'Drop CSV file here or click to upload'
      )}
     </div>
    </>
   )}
  </CSVReader>
 )
}

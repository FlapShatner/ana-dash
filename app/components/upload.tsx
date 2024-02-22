import { FC, useState } from 'react'
import { useAtomsDebugValue } from 'jotai-devtools'

import { useCSVReader } from 'react-papaparse'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@tremor/react'
import { useAtom, useSetAtom } from 'jotai'
import { startInputAtom, endInputAtom, startNameAtom, endNameAtom, sortedDataAtom } from '@/atoms'
import { dataObjectType } from '@/types'
import { getFormattedData } from '@/utils'
import { on } from 'events'
import DeleteIcon from './icons/delete-icon'
interface UploadProps {
 isEnd: boolean
}

const Upload: FC<UploadProps> = ({ isEnd }) => {
 const { CSVReader } = useCSVReader()
 //  const setStartInput = useSetAtom(startInputAtom)
 const [startInput, setStartInput] = useAtom(startInputAtom)
 const setEndInput = useSetAtom(endInputAtom)
 //  const setStartName = useSetAtom(startNameAtom)
 //  const setEndName = useSetAtom(endNameAtom)
 const [startName, setStartName] = useAtom(startNameAtom)
 const [endName, setEndName] = useAtom(endNameAtom)
 const [isUploaded, setUploaded] = useState(false)
 const config = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
 }

 const DebugAtoms = () => {
  useAtomsDebugValue()
  return null
 }

 //  console.log('startInput', startInput)

 const onUpload = (results: any, file: any) => {
  const data: dataObjectType[] = results?.data || []
  isEnd ? setEndInput(getFormattedData(data)) : setStartInput(getFormattedData(data))
  isEnd ? setEndName(file.name) : setStartName(file.name)
  setUploaded(true)
 }

 const onClear = () => {
  isEnd ? setEndInput([]) : setStartInput([])
  isEnd ? setEndName('') : setStartName('')
  setUploaded(false)
 }

 //  console.log('startInput', startInput)

 return (
  <CSVReader
   config={config}
   onUploadAccepted={(results: any, file: any) => {
    onUpload(results, file)
   }}>
   {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }: any) => (
    <>
     <div>
      <DebugAtoms />
      {isUploaded ? (
       <div className='flex justify-center gap-2 cursor-pointer'>
        <p className='text-center'>{isEnd ? endName : startName}</p>
        <DeleteIcon onClick={onClear} />
       </div>
      ) : (
       <Button
        icon={PlusIcon}
        variant='secondary'
        {...getRootProps()}>
        Add {isEnd ? 'Ending' : 'Starting'} CSV
       </Button>
      )}
     </div>
     <ProgressBar />
    </>
   )}
  </CSVReader>
 )
}

export default Upload

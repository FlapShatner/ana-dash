import { FC } from 'react'
import { useCSVReader } from 'react-papaparse'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@tremor/react'
import { useAtom, useSetAtom } from 'jotai'
import { startInputAtom, endInputAtom, startNameAtom, endNameAtom } from '@/atoms'
interface UploadProps {
 isEnd: boolean
}

const Upload: FC<UploadProps> = ({ isEnd }) => {
 const { CSVReader } = useCSVReader()
 const setStartInput = useSetAtom(startInputAtom)
 const setEndInput = useSetAtom(endInputAtom)
 const setStartName = useSetAtom(startNameAtom)
 const setEndName = useSetAtom(endNameAtom)

 const config = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
 }

 return (
  <CSVReader
   config={config}
   onUploadAccepted={(results: any, file: any) => {
    isEnd ? setEndInput(results) : setStartInput(results)
    isEnd ? setEndName(file.name) : setStartName(file.name)
   }}>
   {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }: any) => (
    <>
     <div>
      <Button
       icon={PlusIcon}
       variant='secondary'
       {...getRootProps()}>
       Add {isEnd ? 'Ending' : 'Starting'} CSV
      </Button>
     </div>
     <ProgressBar />
    </>
   )}
  </CSVReader>
 )
}

export default Upload

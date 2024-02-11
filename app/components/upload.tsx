import { FC } from 'react'
import { useCSVReader } from 'react-papaparse'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '@tremor/react'
import { useAtom, useSetAtom } from 'jotai'
import { inputDataAtom } from '@/atoms'
interface UploadProps {}

const Upload: FC<UploadProps> = () => {
 const { CSVReader } = useCSVReader()
 const setInputData = useSetAtom(inputDataAtom)

 const config = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
 }

 return (
  <CSVReader
   config={config}
   onUploadAccepted={(results: any, file: any) => {
    setInputData(results)
   }}>
   {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }: any) => (
    <>
     <div>
      <Button
       icon={PlusIcon}
       variant='secondary'
       {...getRootProps()}>
       Add CSV
      </Button>
     </div>
     <ProgressBar />
    </>
   )}
  </CSVReader>
 )
}

export default Upload

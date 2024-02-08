import { atom } from 'jotai'
import { DateRangePickerValue } from '@tremor/react'
import { Idata } from './types'
import { dataPointType } from './utils'

export const rangeAtom = atom({})
export const sortedDataAtom = atom<dataPointType[]>([])
export const inputDataAtom = atom({} as Idata)
export const selectedIndexAtom = atom(0)

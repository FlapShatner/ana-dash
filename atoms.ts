import { atom } from 'jotai'
import { Idata } from './types'
import { dataPointType } from './utils'

export const rangeAtom = atom({})
export const sortedDataAtom = atom<dataPointType[]>([])
export const inputDataAtom = atom({} as Idata)
export const selectedIndexAtom = atom(0)
export const fileNameAtom = atom('')

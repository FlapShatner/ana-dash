import { atom } from 'jotai'
import { Idata } from './types'
import { dataPointType } from './utils'

export const endRangeAtom = atom({})
export const startRangeAtom = atom({})
export const sortedDataAtom = atom<dataPointType[]>([])
export const inputDataAtom = atom({} as Idata)
export const selectedIndexAtom = atom(0)
export const fileNameAtom = atom('')
export const endInputAtom = atom<dataPointType[]>([])
export const startInputAtom = atom<dataPointType[]>([])
export const startNameAtom = atom('')
export const endNameAtom = atom('')

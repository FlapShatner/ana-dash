import { atom } from 'jotai'
import { Idata } from './types'
import { dataPointType } from './utils'

export const endRangeAtom = atom({})
endRangeAtom.debugLabel = 'endRangeAtom'
export const startRangeAtom = atom({})
startRangeAtom.debugLabel = 'startRangeAtom'
export const sortedDataAtom = atom<dataPointType[]>([])
sortedDataAtom.debugLabel = 'sortedDataAtom'
export const inputDataAtom = atom({} as Idata)
inputDataAtom.debugLabel = 'inputDataAtom'
export const selectedIndexAtom = atom(0)
selectedIndexAtom.debugLabel = 'selectedIndexAtom'
export const fileNameAtom = atom('')
fileNameAtom.debugLabel = 'fileNameAtom'
export const endInputAtom = atom<dataPointType[]>([])
endInputAtom.debugLabel = 'endInputAtom'
export const startInputAtom = atom<dataPointType[]>([])
startInputAtom.debugLabel = 'startInputAtom'
export const startNameAtom = atom('')
startNameAtom.debugLabel = 'startNameAtom'
export const endNameAtom = atom('')
endNameAtom.debugLabel = 'endNameAtom'

export const startRangeDataAtom = atom<dataPointType[]>([])
startRangeDataAtom.debugLabel = 'startRangeDataAtom'
export const endRangeDataAtom = atom<dataPointType[]>([])
endRangeDataAtom.debugLabel = 'endRangeDataAtom'

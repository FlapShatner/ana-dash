import { dataArray } from './types'

export const lastWeekDate = new Date(new Date().setDate(new Date().getDate() - 7))

export const filterByDateRange = (data: any[], startDate: Date, endDate: Date) => {
 return data.filter((item) => {
  const date = new Date(item.publishTime)
  return date >= startDate && date <= endDate
 })
}

export const dateLabel = (date: string) =>
 new Intl.DateTimeFormat('en', {
  timeStyle: 'short',
  dateStyle: 'short',
 }).format(new Date(date))

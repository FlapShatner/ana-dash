import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { dataArray, dataObjectType } from './types'

export const cn = (...inputs: ClassValue[]) => {
 return twMerge(clsx(inputs))
}

export function getData(data: dataArray, key: string): Array<{ date: string; [key: string]: any }> {
 return data.map((item) => ({
  date: String(Date.parse(item['Publish time'])),
  [key]: item[key as keyof dataObjectType], // Added type assertion
 }))
}

export function getDataPoint(data: dataObjectType) {
 return {
  id: data['Account ID'],
  name: data['Account name'],
  username: data['Account username'],
  comment: data.Comment,
  comments: data.Comments,
  date: data.Date,
  description: data.Description,
  duration: data['Duration (sec)'],
  follows: data.Follows,
  impressions: data.Impressions,
  likes: data.Likes,
  permalink: data.Permalink,
  plays: data.Plays,
  postID: data['Post ID'],
  postType: data['Post type'],
  publishTime: data['Publish time'],
  reach: data.Reach,
  saves: data.Saves,
  shares: data.Shares,
 }
}

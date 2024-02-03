export type dataObjectType = {
 'Account ID': string
 'Account name': string
 'Account username': string
 Comment: string
 Comments: number
 Date: string
 Description: string
 'Duration (sec)': number
 Follows: number
 Impressions: number
 Likes: number
 Permalink: string
 Plays: number
 'Post ID': string
 'Post type': string
 'Publish time': string
 Reach: number
 Saves: number
 Shares: number
}

export type dataArray = dataObjectType[]

export interface Idata {
 data: dataArray
 errors: any
 meta: {
  delimiter: string
  linebreak: string
  aborted: boolean
 }
}

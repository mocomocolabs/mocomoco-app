import dayjs from 'dayjs'

export enum DT_FORMAT {
  YMDHM = 'YYYY-MM-DD HH:mm',
  YMD = 'YYYY-MM-DD',
  Y = 'YYYY',
  HM = 'HH:mm',
}

export const ymd = (value?: string) => dayjs(value).format(DT_FORMAT.YMD)
export const hm = (value?: string) => dayjs(value).format(DT_FORMAT.HM)
export const ymdhm = (value?: string) => dayjs(value).format(DT_FORMAT.YMDHM)

export const timeDiff = (from?: string, to?: string) => {
  const fromDate = from ? dayjs(from) : dayjs()
  const toDate = to ? dayjs(to) : dayjs()

  const diffYears = fromDate.diff(toDate, 'year')
  if (diffYears > 0) return toDate.format('YYYY년 M월 D일')

  const diffDays = fromDate.diff(toDate, 'day')
  if (diffDays > 6) return toDate.format('M월 D일')
  if (diffDays > 0) return `${diffDays}일 전`

  const diffHours = fromDate.diff(toDate, 'hour')
  if (diffHours > 0) return `${diffHours}시간 전`

  const diffMinutes = fromDate.diff(toDate, 'minute')
  if (diffMinutes > 0) return `${diffMinutes}분 전`

  const diffSeconds = fromDate.diff(toDate, 'second')
  if (diffSeconds > 0) return `${diffSeconds}초 전`

  return '방금 전'
}

import dayjs from 'dayjs'

export enum DT_FORMAT {
  YMDHM = 'YYYYMMDDHHmm',
  YMD = 'YYYYMMDD',
  Y = 'YYYY',
  HM = 'HHmm',
}

export const ymd = (value?: string) => dayjs(value).format(DT_FORMAT.YMD)
export const hm = (value?: string) => dayjs(value).format(DT_FORMAT.HM)
export const ymdhm = (value?: string) => dayjs(value).format(DT_FORMAT.YMDHM)

export const timeDiff = (from?: string, to?: string) => {
  const fromDate = from ? dayjs(from) : dayjs()
  const toDate = to ? dayjs(to) : dayjs()

  const diffYears = toDate.diff(fromDate, 'year')
  if (diffYears > 0) return fromDate.format('YYYY년 M월 D일')

  const diffDays = toDate.diff(fromDate, 'day')
  if (diffDays > 6) return fromDate.format('M월 D일')
  if (diffDays > 0) return `${diffDays}일 전`

  const diffHours = toDate.diff(fromDate, 'hour')
  if (diffHours > 0) return `${diffHours}시간 전`

  const diffMinutes = toDate.diff(fromDate, 'minute')
  if (diffMinutes > 0) return `${diffMinutes}분 전`

  const diffSeconds = toDate.diff(fromDate, 'second')
  if (diffSeconds > 0) return `${diffSeconds}초 전`

  return '방금 전'
}

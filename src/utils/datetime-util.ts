import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(customParseFormat)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)

const LOCALE = 'ko' // TODO load app locale

import(`dayjs/locale/${LOCALE}.js`).then(() => {
  dayjs.locale(LOCALE)
})

export enum DT_FORMAT {
  YMD = 'YYYYMMDD',
  HMS = 'HHmmss',
}

export const ymd = (value?: string) => dayjs(value).format(DT_FORMAT.YMD)
export const hms = (value?: string, format?: string) => dayjs(value, format).format(DT_FORMAT.HMS)

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

export const datetimeRange = (from: string, to: string) => {
  const fromDate = dayjs(from)
  const toDate = dayjs(to)
  const now = dayjs()

  const diffYears = toDate.diff(fromDate, 'year')
  if (diffYears > 0)
    return `${fromDate.format('YYYY년 M월 D일 A h:mm')} - ${toDate.format('YYYY년 M월 D일 A h:mm')}`

  const showYear = fromDate.diff(now, 'year') !== 0 ? 'YYYY년 ' : ''

  const diffMonths = toDate.diff(fromDate, 'month')
  if (diffMonths > 0)
    return `${fromDate.format(`${showYear}M월 D일 A h:mm`)} - ${toDate.format('M월 D일 A h:mm')}`

  const diffDays = toDate.diff(fromDate, 'day')
  if (diffDays > 0) return `${fromDate.format(`${showYear}M월 D일 A h:mm`)} - ${toDate.format('D일 A h:mm')}`

  const diffMins = toDate.diff(fromDate, 'minute')
  if (diffMins > 0) return `${fromDate.format(`${showYear}M월 D일 A h:mm`)} - ${toDate.format('A h:mm')}`

  return `${dayjs(fromDate).format(`${showYear}M월 D일 A h:mm`)}`
}

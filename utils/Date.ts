import { DateTime } from 'luxon'

export function DateTransform(date: Date): DateTime | null {
  if (!date) {
    return null
  }
  return DateTime.fromJSDate(date)
}

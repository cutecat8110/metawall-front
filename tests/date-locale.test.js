import { afterEach, expect, it, vi } from 'vitest'
import { date, now } from '../src/methods/filters'

afterEach(() => vi.useRealTimers())

it('preserves Traditional Chinese relative time after removing unused locales', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-10-08T02:30:00Z'))
  expect(now(new Date('2026-10-08T02:28:00Z'))).toBe('2 分鐘')
  expect(now(new Date('2026-10-07T02:30:00Z'))).toBe('1 天')
})

it('preserves the existing numeric date format', () => {
  expect(date(new Date(2026, 9, 8, 10, 30))).toBe('2026/10/08 10:30')
})

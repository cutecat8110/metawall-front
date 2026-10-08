// moment
import moment from 'moment'
import 'moment/locale/zh-tw'

// Preserve the original default; relative labels explicitly use zh-tw below.
moment.locale('en')

// eslint-disable-next-line import/prefer-default-export
export function date(time) {
  return moment(time).format('YYYY/MM/DD hh:mm')
}

export function now(time) {
  return moment(time).locale('zh-tw').fromNow(true)
}

export function currency(num) {
  const n = parseInt(num, 10)
  return `${n
    .toFixed(0)
    .replace(/./g, (c, i, a) =>
      i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c
    )}`
}


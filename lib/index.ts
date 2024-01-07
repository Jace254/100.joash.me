import type { Info } from './types'

const info: Info[] = [
  {
    title: 'Balance',
    date: '01/02',
  },
  {
    title: 'Radial',
    date: '01/03',
  },
  {
    title: 'Cryptic',
    date: '01/04',
  },
]

export const submissions = info.map((i, idx) => ({ ...i, no: `${idx + 1}`.padStart(3, '0') }))
export { lipsum } from './lorem'

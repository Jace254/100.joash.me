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
]

export const submissions = info.map((i, idx) => ({ ...i, no: `${idx + 1}`.padStart(3, '0') }))

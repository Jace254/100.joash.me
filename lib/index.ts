import type { Info } from './types'

const info: Info[] = [
  {
    title: 'Balance',
    date: '01/24',
    // draft: true,
  },
]

export const submissions = info.map((i, idx) => ({ ...i, no: `${idx + 1}`.padStart(3, '0') }))

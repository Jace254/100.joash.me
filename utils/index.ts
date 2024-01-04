import type { Updater } from '@tanstack/vue-table'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

export function normalizeAngle(angle: number): number {
  const remainder = angle % 360
  return remainder < 0 ? remainder + 360 : remainder
}

// Given two angles in degrees, returns the smallest angle between them.
// It also accounts for direction.
export function getAngleDifference(angle1: number, angle2: number): number {
  const clockwiseDiff = normalizeAngle(angle2 - angle1)
  const counterClockwiseDiff = 360 - clockwiseDiff
  return clockwiseDiff < counterClockwiseDiff ? clockwiseDiff : -counterClockwiseDiff
}

export function round(value: number, precision: number): number {
  const multiplier = 10 ** (precision || 0)
  return Math.round(value * multiplier) / multiplier
}

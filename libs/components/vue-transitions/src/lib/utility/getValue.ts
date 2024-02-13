import type { Event } from '../types';

export function getValue<T>(
  event: Event,
  value: T | Record<Event, T> | undefined,
  defaultValue: T
): T {
  if (value === undefined || value === null) return defaultValue;
  if (typeof value === 'object') return (value as Record<Event, T>)[event];
  return value;
}

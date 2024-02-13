type Prefix = 'before' | 'after';

export type CancelledEvent = 'enter-cancelled' | 'leave-cancelled';
export type Event = 'enter' | 'leave';
export type HooksName = Event | `${Prefix}-${Event}` | CancelledEvent;

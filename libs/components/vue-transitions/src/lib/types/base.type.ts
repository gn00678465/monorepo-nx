import type { TransitionProps } from 'vue';
import type { Event, HooksName, CancelledEvent } from './events.type';

type EventOr<T> = T | Record<Event, T>;

export type Easing = EventOr<string>;
export type Delay = EventOr<number>;

export type SetupTransitionOptions = {
  duration?: TransitionProps['duration'];
  easing?: Easing;
  delay?: Delay;
};

export type HooksReturn = {
  [key in Event]: (el: Element, done: () => void) => void;
} & {
  [key in Exclude<HooksName, 'enter' | 'leave' | CancelledEvent>]: (
    el: Element
  ) => void;
} & {
  [key in CancelledEvent]?: (el: Element) => void;
};

export interface HooksOptions {
  onEnter?: (el: Element, done?: () => void) => void;
  onLeave?: (el: Element, done?: () => void) => void;
  resetElement?: (el: Element) => void;
}

// transition slide
export type SlideOffset = EventOr<[number | string, number | string]>;

// transition scale
export type ScaleOrigin = EventOr<'both' | 'x' | 'y'>;
export type ScaleAxis = EventOr<string>;
export type ScaleValue = EventOr<number>;

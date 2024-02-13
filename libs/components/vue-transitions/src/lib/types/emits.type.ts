import type { HooksName, Event } from './events.type';
import type { TransitionElement } from './element';

export type TransitionEmits = {
  (e: Event, el: TransitionElement, done: () => void): void;
  (e: Exclude<HooksName, Event>, el: TransitionElement): void;
};

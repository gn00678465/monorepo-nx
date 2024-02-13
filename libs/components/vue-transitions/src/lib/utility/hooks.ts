import { reduceTransition, resetTransition, initLeaving } from './base';
import type { HooksReturn, HooksOptions } from '../types';

export function hooks({
  onEnter,
  onLeave,
  resetElement
}: HooksOptions): HooksReturn {
  return {
    'before-enter': (el: Element) => {
      reduceTransition(el);
    },
    'after-enter': (el: Element) => {
      resetTransition(el);
      resetElement?.(el);
    },
    enter: (el: Element, done: () => void) => {
      onEnter?.(el, done);
    },
    'before-leave': (el: Element) => {
      reduceTransition(el);
      initLeaving?.(el);
    },
    'after-leave': (el: Element) => {
      resetTransition(el);
      resetElement?.(el);
    },
    leave: (el: Element, done: () => void) => {
      onLeave?.(el, done);
    }
  };
}

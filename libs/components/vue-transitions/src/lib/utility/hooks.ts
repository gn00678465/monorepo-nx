import { reduceTransition, resetTransition } from './base';
import type { HooksReturn, HooksOptions } from '../types';

export function hooks({
  onEnter,
  onLeave,
  resetElement,
  initLeaving
}: HooksOptions): HooksReturn {
  return {
    'before-enter': (el: Element) => {
      reduceTransition(el);
    },
    'after-enter': (el: Element) => {
      resetTransition(el);
      resetElement?.(el);
    },
    enter: (el: Element, done?: (() => void) | undefined) => {
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
    leave: (el: Element, done?: (() => void) | undefined) => {
      onLeave?.(el, done);
    }
  };
}

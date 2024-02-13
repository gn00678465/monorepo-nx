import { getValue } from './getValue';
import type { Event, SetupTransitionOptions } from '../types';

export function setupTransition(
  el: Element,
  event: Event = 'enter',
  options: SetupTransitionOptions = {}
) {
  const duration = getValue(event, options.duration, 300);
  const easing = getValue(event, options.easing, 'ease-in-out');
  const delay = getValue(event, options.delay, 0);

  (el as HTMLElement).style.setProperty(
    'transition-duration',
    `${duration}ms`,
    'important'
  );
  (el as HTMLElement).style.setProperty(
    'transition-timing-function',
    `${easing}`,
    'important'
  );
  (el as HTMLElement).style.setProperty(
    'transition-delay',
    `${delay}ms`,
    'important'
  );
}

export function reduceTransition(el: Element) {
  (el as HTMLElement).style.setProperty(
    'transition-duration',
    '0ms',
    'important'
  );
  (el as HTMLElement).style.setProperty('transition-delay', '0ms', 'important');
}

export function resetTransition(el: Element) {
  (el as HTMLElement).style.removeProperty('transition-duration');
  (el as HTMLElement).style.removeProperty('transition-timing-function');
  (el as HTMLElement).style.removeProperty('transition-delay');
}

export function initLeaving(el: Element) {
  const styles = getComputedStyle(el as HTMLElement);
  const { width, height } = styles;
  const { marginLeft, marginTop } = styles;

  (el as HTMLElement).style.setProperty(
    'left',
    `${(el as HTMLElement).offsetLeft - parseFloat(marginLeft)}px`,
    'important'
  );
  (el as HTMLElement).style.setProperty(
    'top',
    `${(el as HTMLElement).offsetTop - parseFloat(marginTop)}px`,
    'important'
  );
  (el as HTMLElement).style.setProperty(
    'width',
    `${parseFloat(width)}px`,
    'important'
  );
  (el as HTMLElement).style.setProperty(
    'height',
    `${parseFloat(height)}px`,
    'important'
  );
  (el as HTMLElement).style.setProperty('position', 'absolute', 'important');

  return el as Element;
}

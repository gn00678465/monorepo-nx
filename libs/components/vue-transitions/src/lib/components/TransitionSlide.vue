<template>
  <component
    :is="Transition"
    name="slide"
    v-bind="{ ...otherProps, ...attrs, duration }"
    v-on="hooks({ onEnter, onLeave, resetElement, initLeaving })"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
export interface TransitionSlideProps extends Omit<TransitionProps, 'name'> {
  easing?: Easing;
  delay?: Delay;
  offset?: SlideOffset;
  opacity?: boolean;
}

export default {
  name: 'TransitionSlide',
  inheritAttrs: false
};
</script>

<script setup lang="ts">
import { Transition, toRefs, toValue, useAttrs, reactive } from 'vue';
import type { TransitionProps } from 'vue';
import {
  getValue,
  defaultValue,
  getMatrix,
  hooks,
  setupTransition,
  initLeaving
} from '../utility/index';
import type { Easing, Delay, SlideOffset, Event } from '../types';

const props = withDefaults(defineProps<TransitionSlideProps>(), {
  ...defaultValue,
  opacity: true
});
const {
  delay,
  duration,
  easing,
  opacity,
  offset: _offset,
  ..._props
} = toRefs(props);
const otherProps = reactive(_props);
const attrs = useAttrs();

function slideElement(element: Element, event: Event = 'enter') {
  const { width, height, transform } = getComputedStyle(element);
  const offset = getValue(event, toValue(_offset), [0, 16]);
  let [offsetX, offsetY] = offset;

  if (typeof offsetX !== 'number') {
    const val = offsetX.endsWith('%')
      ? (parseFloat(width) * (parseFloat(offsetX.slice(0, -1)) || 0)) / 100
      : parseFloat(offsetX);
    offsetX = val;
  }

  if (typeof offsetY !== 'number') {
    const val = offsetY.endsWith('%')
      ? (parseFloat(height) * (parseFloat(offsetY.slice(0, -1)) || 0)) / 100
      : parseFloat(offsetY);
    offsetY = val;
  }

  const [matrixType, matrix] = getMatrix(transform);

  // Respect existing 3D transform
  if (transform.startsWith('matrix3d')) {
    matrix[12] += offsetX;
    matrix[13] += offsetY;
    // Respect existing 2D transform
  } else if (transform.startsWith('matrix')) {
    matrix[4] += offsetX;
    matrix[5] += offsetY;
    // Just apply the transition
  } else {
    matrix[4] = offsetX;
    matrix[5] = offsetY;
  }

  if (toValue(opacity)) {
    (element as HTMLElement).style.setProperty('opacity', '0');
  }

  (element as HTMLElement).style.setProperty(
    'transform',
    `${matrixType}(${matrix})`
  );
}

function onEnter(el: Element) {
  slideElement(el, 'enter');
  (el as HTMLElement).offsetTop;
  setupTransition(el as HTMLElement, 'enter', {
    duration: toValue(duration),
    easing: toValue(easing),
    delay: toValue(delay)
  });
  (el as HTMLElement).style.removeProperty('opacity');
  (el as HTMLElement).style.removeProperty('transform');
}

function onLeave(el: Element) {
  setupTransition(el as HTMLElement, 'leave', {
    duration: toValue(duration),
    easing: toValue(easing),
    delay: toValue(delay)
  });
  slideElement(el, 'leave');
}

function resetElement(el: Element) {
  (el as HTMLElement).style.removeProperty('opacity');
  (el as HTMLElement).style.removeProperty('transform');
}
</script>

<style scoped>
@import url('../styles//slide.css');
</style>

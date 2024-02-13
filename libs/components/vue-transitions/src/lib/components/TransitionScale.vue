<template>
  <component
    :is="Transition"
    name="scale"
    v-bind="{ ...otherProps, ...attrs, duration }"
    v-on="hooks({ onEnter, onLeave, resetElement })"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
export interface TransitionScaleProps extends Omit<TransitionProps, 'name'> {
  easing?: Easing;
  delay?: Delay;
  opacity?: boolean;
  origin?: ScaleOrigin;
  axis?: ScaleAxis;
  scale?: ScaleValue;
}

export default {
  name: 'TransitionScale',
  inheritAttrs: false
};
</script>

<script setup lang="ts">
import { Transition, toRefs, toValue, reactive, useAttrs, nextTick } from 'vue';
import type { TransitionProps } from 'vue';
import {
  defaultValue,
  hooks,
  setupTransition,
  getMatrix,
  getValue
} from '../utility/index';
import type {
  Easing,
  Delay,
  Event,
  ScaleOrigin,
  ScaleAxis,
  ScaleValue
} from '../types';

const props = withDefaults(defineProps<TransitionScaleProps>(), {
  ...defaultValue,
  opacity: true
});
const {
  delay,
  duration,
  easing,
  opacity,
  origin: _origin,
  axis: _axis,
  scale: _scale,
  ..._props
} = toRefs(props);
const otherProps = reactive(_props);
const attrs = useAttrs();

function scaleElement(el: Element, event: Event = 'enter') {
  const { transform } = getComputedStyle(el);

  const axis = getValue(event, toValue(_axis), 'both');
  const origin = getValue(event, toValue(_origin), '50% 50%');
  // const scale = clamp(0.0001, scale?.[event] ?? scale, 0.9999);
  const scale = Math.min(
    0.9999,
    Math.max(0.0001, getValue(event, toValue(_scale), 0))
  );

  const [matrixType, matrix] = getMatrix(transform);

  // Respect existing 3D transform
  if (transform.startsWith('matrix3d')) {
    if (axis !== 'y') matrix[0] = scale;
    if (axis !== 'x') matrix[5] = scale;
    // Respect existing 2D transform
  } else if (transform.startsWith('matrix')) {
    if (axis !== 'y') matrix[0] = scale;
    if (axis !== 'x') matrix[3] = scale;
    // Just set own transform
  } else {
    matrix[0] = axis === 'y' ? 1 : scale;
    matrix[3] = axis === 'x' ? 1 : scale;
  }

  if (toValue(opacity)) {
    (el as HTMLElement).style.setProperty('opacity', '0');
  }

  (el as HTMLElement).style.setProperty(
    'transform',
    `${matrixType}(${matrix})`
  );
  (el as HTMLElement).style.setProperty('transform-origin', `${origin}`);
}

function onEnter(el: Element) {
  scaleElement(el, 'enter');
  (el as HTMLElement).offsetTop;
  setupTransition(el, 'enter', {
    duration: toValue(duration),
    easing: toValue(easing),
    delay: toValue(delay)
  });
  nextTick(() => {
    (el as HTMLElement).style.removeProperty('opacity');
    (el as HTMLElement).style.removeProperty('transform');
  });
}

function onLeave(el: Element) {
  setupTransition(el, 'leave', {
    duration: toValue(duration),
    easing: toValue(easing),
    delay: toValue(delay)
  });
  scaleElement(el, 'leave');
}

function resetElement(el: Element) {
  (el as HTMLElement).style.removeProperty('opacity');
  (el as HTMLElement).style.removeProperty('transform');
  (el as HTMLElement).style.removeProperty('transform-origin');
}
</script>

<style scoped></style>

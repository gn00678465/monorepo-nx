<template>
  <component
    :is="TransitionGroup"
    name="fade"
    :style="rootStyle"
    v-bind="{ ...otherProps, ...attrs, duration }"
    v-on="hooks({ onEnter, onLeave, resetElement })"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
export interface TransitionGroupFadeProps
  extends Omit<TransitionGroupProps, 'name'> {
  easing?: Easing;
  delay?: Delay;
  moveDuration?: number;
}

export default {
  name: 'TransitionGroupFade',
  inheritAttrs: false
};
</script>

<script setup lang="ts">
import {
  TransitionGroup,
  toRefs,
  toValue,
  reactive,
  useAttrs,
  nextTick,
  computed
} from 'vue';
import type { TransitionGroupProps } from 'vue';
import { defaultValue, hooks, setupTransition } from '../utility/index';
import type { Easing, Delay } from '../types';

const props = withDefaults(defineProps<TransitionGroupFadeProps>(), {
  ...defaultValue,
  moveDuration: 300
});
const { delay, duration, easing, moveDuration, ..._props } = toRefs(props);
const otherProps = reactive(_props);
const attrs = useAttrs();

const rootStyle = computed(() => ({
  '--move-duration': `${toValue(moveDuration)}ms`
}));

function onEnter(el: Element) {
  fadeElement(el);
  (el as HTMLElement).offsetTop; // eslint-disable-line no-unused-expressions
  setupTransition(el as HTMLElement, 'enter', {
    duration: toValue(duration),
    easing: toValue(easing),
    delay: toValue(delay)
  });
  nextTick(() => {
    (el as HTMLElement).style.removeProperty('opacity');
  });
}

function onLeave(el: Element) {
  setupTransition(el, 'leave', {
    duration: toValue(duration),
    easing: toValue(easing),
    delay: toValue(delay)
  });
  fadeElement(el);
}

function fadeElement(el: Element) {
  (el as HTMLElement).style.setProperty('opacity', '0');
}

function resetElement(el: Element) {
  (el as HTMLElement).style.removeProperty('opacity');
}
</script>

<style scoped>
@import url('../styles/fade.css');
</style>

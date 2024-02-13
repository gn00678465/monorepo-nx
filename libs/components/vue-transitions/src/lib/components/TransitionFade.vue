<template>
  <component
    :is="Transition"
    name="fade"
    v-bind="{ ...otherProps, ...attrs, duration }"
    v-on="hooks({ onEnter, onLeave, resetElement })"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
export interface TransitionFadeProps extends Omit<TransitionProps, 'name'> {
  easing?: Easing;
  delay?: Delay;
}

export default {
  name: 'TransitionFade',
  inheritAttrs: false
};
</script>

<script setup lang="ts">
import { Transition, toRefs, toValue, reactive, useAttrs, nextTick } from 'vue';
import type { TransitionProps } from 'vue';
import { defaultValue, hooks, setupTransition } from '../utility/index';
import type { Easing, Delay } from '../types';

const props = withDefaults(defineProps<TransitionFadeProps>(), defaultValue);
const { delay, duration, easing, ..._props } = toRefs(props);
const otherProps = reactive(_props);
const attrs = useAttrs();

function onEnter(el: Element) {
  fadeElement(el);
  (el as HTMLElement).offsetTop; // eslint-disable-line no-unused-expressions
  setupTransition(el as HTMLElement, 'enter', {
    duration: toValue(duration),
    easing: toValue(easing),
    delay: toValue(delay)
  });
  nextTick(() => (el as HTMLElement).style.removeProperty('opacity'));
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
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity !important;
}
</style>

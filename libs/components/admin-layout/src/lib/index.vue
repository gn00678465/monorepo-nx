<script setup lang="ts">
import { computed, reactive, toRefs, toValue } from 'vue';
import style from './styles/index.module.css';
import { createAdminLayoutCssVars } from './helper';
import type { AdminLayoutProps, AdminLayoutSlots } from './types';

const props = withDefaults(defineProps<AdminLayoutProps>(), {
  mode: 'vertical',
  fixedTop: true,
  commonClass: undefined,
  headerVisible: true,
  headerHeight: 50,
  tabVisible: true,
  tabHeight: 48,
  sidebarVisible: true,
  sidebarCollapse: false,
  sidebarWidth: 240,
  sidebarCollapsedWidth: 64,
  footerVisible: true,
  footerHeight: 48
});

const { commonClass, fullContent } = toRefs(props);

const slots = defineSlots<AdminLayoutSlots>();

const cssVars = computed(() => createAdminLayoutCssVars(props));

const visible = reactive({
  header: computed(() => Boolean(slots.header) && props.headerVisible),
  tab: computed(() => Boolean(slots.tab) && props.tabVisible),
  sidebar: computed(
    () => !props.isMobile && Boolean(slots.sidebar) && props.sidebarVisible
  ),
  mobileSidebar: computed(
    () => props.isMobile && Boolean(slots.sidebar) && props.sidebarVisible
  ),
  footer: computed(() => Boolean(slots.footer) && props.footerVisible)
});

const isVertical = computed(() => props.mode === 'vertical');
const isHorizontal = computed(() => props.mode === 'horizontal');

/** fixed header adn tab */
const fixedHeaderAndTab = computed(() => props.fixedTop || isHorizontal.value);

const classes = reactive({
  header: computed(() => [
    style['layout-header'],
    toValue(commonClass),
    props.headerClass
  ]),
  tab: computed(() => [
    style['layout-tab'],
    toValue(commonClass),
    props.tabClass
  ]),
  sideBar: computed(() => [
    toValue(commonClass),
    props.sidebarClass,
    props.sidebarCollapse
      ? style['layout-sidebar_collapsed']
      : style['layout-sidebar']
  ]),
  content: computed(() => [toValue(commonClass), props.contentClass]),
  mobileSidebar: computed(() => [
    toValue(commonClass),
    props.mobileSidebarClass
  ]),
  footer: computed(() => [
    style['layout-footer'],
    toValue(commonClass),
    props.footerClass
  ])
});

const leftGapClass = reactive({
  content: computed(() => {
    if (!props.fullContent && visible.sidebar) {
      return props.sidebarCollapse
        ? style['left-gap_collapsed']
        : style['left-gap'];
    }

    return '';
  })
});
</script>

<template>
  <div :style="cssVars" :class="['relative h-full', commonClass]">
    <div :class="['flex h-full flex-col', commonClass]">
      <!-- header -->
      <template v-if="visible.header">
        <header
          v-show="!fullContent"
          :class="[
            ...classes.header,
            'flex-shrink-0',
            { 'absolute left-0 top-0 w-full': fixedHeaderAndTab }
          ]"
        >
          <slot name="header"></slot>
        </header>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          :class="[
            style['layout-header-placement'],
            'flex-shrink-0 overflow-hidden'
          ]"
        ></div>
      </template>
      <!-- tab -->
      <template v-if="visible.tab">
        <nav
          v-show="!fullContent"
          :class="[
            ...classes.tab,
            'flex-shrink-0',
            { 'top-0!': !visible.header },
            { 'absolute left-0 w-full': fixedHeaderAndTab }
          ]"
        >
          <slot name="tab"></slot>
        </nav>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          :class="[
            style['layout-tab-placement'],
            'flex-shrink-0 overflow-hidden'
          ]"
        ></div>
      </template>
      <!-- sidebar(desktop) -->
      <template v-if="visible.sidebar">
        <aside
          v-show="!fullContent"
          :class="[...classes.sideBar, 'absolute left-0 top-0 h-full']"
        >
          <slot name="sidebar"></slot>
        </aside>
      </template>
      <!-- sidebar(mobile) -->
      <template v-if="visible.mobileSidebar">
        <aside :class="[...classes.mobileSidebar]">
          <slot name="sidebar"></slot>
        </aside>
      </template>
      <!-- main content -->
      <main
        :class="[
          ...classes.content,
          'flex flex-grow flex-col',
          leftGapClass.content
        ]"
      >
        <slot></slot>
      </main>
      <!-- footer -->
      <template v-if="visible.footer">
        <footer
          v-show="!fullContent"
          :class="[
            ...classes.footer,
            'flex-shrink-0',
            { 'absolute bottom-0 left-0 w-full': fixedFooter }
          ]"
        >
          <slot name="footer"></slot>
        </footer>
      </template>
    </div>
  </div>
</template>

<style scoped>
@import url('./styles/utility.css');
</style>

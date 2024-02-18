import type { CssVarsProps, CssVars, AdminLayoutProps } from './types';

const defaultZIndex = 3000;

function createCssVars(props: CssVarsProps) {
  const cssVars: CssVars = {
    '--header-height': `${props.headerHeight}px`,
    '--tab-height': `${props.tabHeight}px`,
    '--sidebar-width': `${props.sidebarWidth}px`,
    '--sidebar-collapsed-width': `${props.sidebarCollapsedWidth}px`,
    '--footer-height': `${props.footerHeight}px`,
    '--sidebar-z-index': `${props.sidebarZIndex}`,
    '--mobile-sidebar-z-index': `${props.mobileSidebarZIndex}`
  };

  return cssVars;
}

export function createAdminLayoutCssVars(props: AdminLayoutProps) {
  const {
    mode,
    isMobile,
    headerHeight,
    tabHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    footerHeight
  } = props;

  const sidebarZIndex =
    mode === 'vertical' || isMobile ? defaultZIndex - 1 : defaultZIndex - 4;
  const mobileSidebarZIndex = isMobile ? defaultZIndex - 2 : 0;

  const cssProps: CssVarsProps = {
    headerHeight,
    tabHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    footerHeight,
    sidebarZIndex,
    mobileSidebarZIndex
  };

  return createCssVars(cssProps);
}

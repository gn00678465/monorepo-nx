import type { CssVarsProps, CssVars, AdminLayoutProps } from './types';

function createCssVars(props: CssVarsProps) {
  const cssVars: CssVars = {
    '--header-height': `${props.headerHeight}px`,
    '--tab-height': `${props.tabHeight}px`,
    '--sidebar-width': `${props.sidebarWidth}px`,
    '--sidebar-collapsed-width': `${props.sidebarCollapsedWidth}px`,
    '--footer-height': `${props.footerHeight}px`
  };

  return cssVars;
}

export function createAdminLayoutCssVars(props: AdminLayoutProps) {
  const {
    // mode,
    // isMobile,
    headerHeight,
    tabHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    footerHeight
  } = props;

  const cssProps: CssVarsProps = {
    headerHeight,
    tabHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    footerHeight
  };

  return createCssVars(cssProps);
}

import type { AdminLayoutProps } from './props.type';
import type { KebabCase } from './kebabCase.type';

export type CssVarsProps = Pick<
  AdminLayoutProps,
  | 'headerHeight'
  | 'tabHeight'
  | 'sidebarWidth'
  | 'sidebarCollapsedWidth'
  | 'footerHeight'
>;

export type CssVars = {
  [K in keyof CssVarsProps as `--${KebabCase<K>}`]: string | number;
};

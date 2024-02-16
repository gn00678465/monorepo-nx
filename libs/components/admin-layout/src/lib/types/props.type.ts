interface HeaderConfig {
  headerVisible?: boolean;
  headerClass?: string;
  headerHeight?: number;
}

interface TabConfig {
  tabVisible?: boolean;
  tabClass?: string;
  tabHeight?: number;
}

interface SidebarConfig {
  sidebarVisible?: boolean;
  sidebarClass?: string;
  sidebarCollapse?: boolean;
  sidebarWidth?: number;
  sidebarCollapsedWidth?: number;
}

interface MobileSidebarConfig {
  mobileSidebarClass?: string;
}

interface ContentConfig {
  contentClass?: string;
  /**
   * 當 content 是否設定為全螢幕
   * 當 content 為全螢幕其他元素會隱藏
   * @description
   */
  fullContent?: boolean;
}

interface FooterConfig {
  footerVisible?: boolean;
  fixedFooter?: boolean;
  footerClass?: string;
  footerHeight?: number;
}

/**
 * layout 模式
 * - horizontal 水平
 * - vertical 垂直
 */
export type LayoutMode = 'horizontal' | 'vertical';

export interface AdminLayoutProps
  extends HeaderConfig,
    TabConfig,
    SidebarConfig,
    MobileSidebarConfig,
    ContentConfig,
    FooterConfig {
  /**
   * layout 模式
   */
  mode?: LayoutMode;
  /**
   * 是否為可攜式裝置
   */
  isMobile?: boolean;
  /**
   * 固定 header 與 tab
   * @default true
   */
  fixedTop?: boolean;
  /**
   * 通用 class
   * - 可以用來設定 transition 樣式
   * @default 'transition-all-300'
   */
  commonClass?: string;
}

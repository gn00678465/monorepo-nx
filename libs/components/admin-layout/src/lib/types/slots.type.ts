type SlotFn = (props?: Record<string, unknown>) => unknown;

export type AdminLayoutSlots = {
  /** content slot */
  default?: SlotFn;
  /** header slot */
  header?: SlotFn;
  /** tab slot */
  tab?: SlotFn;
  /** sidebar slot */
  sidebar?: SlotFn;
  /** footer slot */
  footer?: SlotFn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SlotFn<T = Record<string, unknown>> = (props?: T) => any;

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

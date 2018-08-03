export interface MDCSelectAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  floatLabel: (shouldFloat: boolean) => void;
  activateBottomLine: () => void;
  deactivateBottomLine: () => void;
  isRtl: () => boolean;
  hasLabel: () => boolean;
  getLabelWidth: () => number;
  getValue: () => string;
  hasOutline: () => boolean;
  notchOutline: (labelWidth: number, isRtl: boolean) => void;
  closeOutline: () => void;
}

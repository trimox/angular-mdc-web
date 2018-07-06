export interface MDCSelectAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  hasClass: (className: string) => boolean;
  floatLabel: (shouldFloat: boolean) => void;
  activateBottomLine: () => void;
  deactivateBottomLine: () => void;
  registerInteractionHandler: (type: string, handler: EventListener) => void;
  deregisterInteractionHandler: (type: string, handler: EventListener) => void;
  getSelectedIndex: () => number;
  setSelectedIndex: (index: number) => void;
  setDisabled: (disabled: boolean) => void;
  getValue: () => string;
  setValue: (value: string) => void;
  isRtl: () => boolean;
  hasLabel: () => boolean;
  getLabelWidth: () => number;
  hasOutline: () => boolean;
  notchOutline: (labelWidth: number, isRtl: boolean) => void;
  closeOutline: () => void;
}

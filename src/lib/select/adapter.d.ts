export interface MDCSelectAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  floatLabel: (value: any) => void;
  activateBottomLine: () => void;
  deactivateBottomLine: () => void;
  registerInteractionHandler: (type: string, handler: EventListener) => void;
  deregisterInteractionHandler: (type: string, handler: EventListener) => void;
  getSelectedIndex: () => number;
  setSelectedIndex: (index: number) => void;
  setDisabled: (disabled: boolean) => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

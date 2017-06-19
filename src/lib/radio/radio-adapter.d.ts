export interface MDCRadioAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  getNativeControl: () => { checked: boolean, disabled: boolean, value: string };
}
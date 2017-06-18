export interface MDCRadioAdapter {
  addClass: (string) => void
  removeClass: (string) => void
  getNativeControl: () => { checked: boolean, disabled: boolean, value: string }
}
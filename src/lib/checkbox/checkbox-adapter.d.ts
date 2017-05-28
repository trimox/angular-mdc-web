export interface MDCCheckboxAdapter {
  addClass: (string) => void
  removeClass: (string) => void
  registerAnimationEndHandler: (EventListener) => void
  deregisterAnimationEndHandler: (EventListener) => void
  registerChangeHandler: (EventListener) => void
  deregisterChangeHandler: (EventListener) => void
  getNativeControl: () => { checked: boolean, indeterminate: boolean }
  forceLayout: () => void
  isAttachedToDOM: () => boolean
}
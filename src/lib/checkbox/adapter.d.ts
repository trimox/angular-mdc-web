export interface MDCCheckboxAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  registerAnimationEndHandler: (handler: EventListener) => void;
  deregisterAnimationEndHandler: (handler: EventListener) => void;
  registerChangeHandler: (handler: EventListener) => void;
  deregisterChangeHandler: (handler: EventListener) => void;
  getNativeControl: () => { checked: boolean, indeterminate: boolean };
  forceLayout: () => void;
  isAttachedToDOM: () => boolean;
}

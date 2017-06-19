export interface MDCSnackbarAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  setAriaHidden: () => void;
  unsetAriaHidden: () => void;
  setMessageText: (message: string) => void;
  setActionText: (actionText: string) => void;
  setActionAriaHidden: () => void;
  unsetActionAriaHidden: () => void;
  registerActionClickHandler: (EventListener) => void;
  deregisterActionClickHandler: (EventListener) => void;
  registerTransitionEndHandler: (EventListener) => void;
  deregisterTransitionEndHandler: (EventListener) => void;
}
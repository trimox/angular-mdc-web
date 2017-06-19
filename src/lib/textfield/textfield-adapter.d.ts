export interface MDCTextfieldAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  addClassToLabel: (className: string) => void;
  removeClassFromLabel: (className: string) => void;
  addClassToHelptext: (className: string) => void;
  removeClassFromHelptext: (className: string) => void;
  helptextHasClass: (className: string) => boolean;
  registerInputFocusHandler: (EventListener) => void;
  deregisterInputFocusHandler: (EventListener) => void;
  registerInputBlurHandler: (EventListener) => void;
  deregisterInputBlurHandler: (EventListener) => void;
  registerInputInputHandler: (EventListener) => void;
  deregisterInputInputHandler: (EventListener) => void;
  registerInputKeydownHandler: (EventListener) => void;
  deregisterInputKeydownHandler: (EventListener) => void;
  setHelptextAttr: (name: string, value: string) => void;
  removeHelptextAttr: (className: string) => void;
  getNativeInput: () => void;
}
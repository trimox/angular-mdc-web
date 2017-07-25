export interface MDCTextfieldAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  addClassToLabel: (className: string) => void;
  removeClassFromLabel: (className: string) => void;
  addClassToHelptext: (className: string) => void;
  removeClassFromHelptext: (className: string) => void;
  helptextHasClass: (className: string) => boolean;
  registerInputFocusHandler: (handler: EventListener) => void;
  deregisterInputFocusHandler: (handler: EventListener) => void;
  registerInputBlurHandler: (handler: EventListener) => void;
  deregisterInputBlurHandler: (handler: EventListener) => void;
  registerInputInputHandler: (handler: EventListener) => void;
  deregisterInputInputHandler: (handler: EventListener) => void;
  registerInputKeydownHandler: (handler: EventListener) => void;
  deregisterInputKeydownHandler: (handler: EventListener) => void;
  setHelptextAttr: (name: string, value: string) => void;
  removeHelptextAttr: (className: string) => void;
  getNativeInput: () => HTMLInputElement;
}

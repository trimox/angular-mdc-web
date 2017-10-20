export interface MDCTextfieldAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  addClassToLabel: (className: string) => void;
  removeClassFromLabel: (className: string) => void;
  setIconAttr: (name: string, value: string) => void;
  eventTargetHasClass: (target: HTMLElement, className: string) => void;
  registerTextFieldInteractionHandler: (evtType: string, handler: EventListener) => void;
  deregisterTextFieldInteractionHandler: (evtType: string, handler: EventListener) => void;
  notifyIconAction: () => void;
  addClassToBottomLine: (className: string) => void;
  removeClassFromBottomLine: (className: string) => void;
  addClassToHelptext: (className: string) => void;
  removeClassFromHelptext: (className: string) => void;
  helptextHasClass: (className: string) => boolean;
  registerInputInteractionHandler: (evtType: string, handler: EventListener) => void;
  deregisterInputInteractionHandler: (evtType: string, handler: EventListener) => void;
  registerTransitionEndHandler: (handler: EventListener) => void;
  deregisterTransitionEndHandler: (handler: EventListener) => void;
  setBottomLineAttr: (attr: string, value: string) => void;
  setHelptextAttr: (name: string, value: string) => void;
  removeHelptextAttr: (className: string) => void;
  getNativeInput: () => {
    value: string,
    disabled: boolean,
    badInput: boolean,
    checkValidity: () => boolean,
  };
}

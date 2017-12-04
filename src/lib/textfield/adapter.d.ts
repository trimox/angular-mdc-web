export interface MDCTextFieldAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  addClassToLabel: (className: string) => void;
  removeClassFromLabel: (className: string) => void;
  setIconAttr: (name: string, value: string) => void;
  eventTargetHasClass: (target: HTMLElement, className: string) => void;
  registerTextFieldInteractionHandler: (evtType: string, handler: EventListener) => void;
  deregisterTextFieldInteractionHandler: (evtType: string, handler: EventListener) => void;
  notifyIconAction: () => void;
  registerInputInteractionHandler: (evtType: string, handler: EventListener) => void;
  deregisterInputInteractionHandler: (evtType: string, handler: EventListener) => void;
  registerBottomLineEventHandler: (evtType: string, handler: EventListener) => void;
  deregisterBottomLineEventHandler: (evtType: string, handler: EventListener) => void;
  getNativeInput: () => {
    value: string,
    disabled: boolean,
    badInput: boolean,
    checkValidity: () => boolean,
  };
  getBottomLineFoundation: () => any;
  getHelperTextFoundation: () => any;
}

export interface MDCTextFieldBottomLineAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  setAttr: (attr: string, value: string) => void;
  registerEventHandler: (evtType: string, handler: EventListener) => void;
  deregisterEventHandler: (evtType: string, handler: EventListener) => void;
  notifyAnimationEnd: () => void;
}

export interface MDCTextFieldHelperTextAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  hasClass:  (className: string) => boolean;
  setAttr: (attr: string, value: string) => void;
  removeAttr: (attr: string) => void;
  setContent: (attr: string) => void;
}

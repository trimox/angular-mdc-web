export interface MDCTabAdapter {  
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  registerInteractionHandler: (type: string, handler: EventListener) => void;
  deregisterInteractionHandler: (type: string, handler: EventListener) => void;
  getOffsetWidth: () => number;
  getOffsetLeft: () => number;
  notifySelected: () => void;
}

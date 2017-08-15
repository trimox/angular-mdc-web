export interface MDCIconToggleAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  registerInteractionHandler: (type: string, handler: EventListener) => void;
  deregisterInteractionHandler: (type: string, handler: EventListener) => void;
  setText: (text: string) => void;
  getTabIndex: () => number;
  setTabIndex: (tabIndex: number) => void;
  getAttr: (name: string) => string;
  setAttr: (name: string, value: string) => void;
  rmAttr: (name: string) => void;
  notifyChange: (evtData) => void;
}

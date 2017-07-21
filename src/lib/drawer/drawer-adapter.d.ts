export interface MDCDrawerAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  hasClass: (className: string) => boolean;
  hasNecessaryDom: () => boolean;
  registerInteractionHandler: (evt: string, handler: EventListener) => void;
  deregisterInteractionHandler: (evt: string, handler: EventListener) => void;
  registerDrawerInteractionHandler: (evt: string, handler: EventListener) => void;
  deregisterDrawerInteractionHandler: (evt: string, handler: EventListener) => void;
  registerTransitionEndHandler: (handler: EventListener) => void;
  deregisterTransitionEndHandler: (handler: EventListener) => void;
  registerDocumentKeydownHandler: (handler: EventListener) => void;
  deregisterDocumentKeydownHandler: (handler: EventListener) => void;
  setTranslateX: (value: number | null) => void;
  getFocusableElements: () => NodeList | null;
  saveElementTabState: (el: Element) => void;
  restoreElementTabState: (el: Element) => void;
  makeElementUntabbable: (el: Element) => void;
  notifyOpen: () => void;
  notifyClose: () => void;
  isRtl: () => boolean;
  getDrawerWidth: () => number;
}

export interface MDCDrawerPersistentAdapter extends MDCDrawerAdapter {
  isDrawer: (el: Element) => boolean;
}

export interface MDCDrawerTemporaryAdapter extends MDCDrawerAdapter {
  addBodyClass: (className: string) => void;
  removeBodyClass: (className: string) => void;
  isDrawer: (el: Element) => boolean;
  updateCssVariable: (value: string) => void;
}

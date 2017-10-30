export interface MDCDialogAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  addBodyClass: (className: string) => void;
  removeBodyClass: (className: string) => void;
  eventTargetHasClass: (target: HTMLElement, className: string) => boolean;
  registerInteractionHandler: (evt: string, handler: EventListener) => void;
  deregisterInteractionHandler: (evt: string, handler: EventListener) => void;
  registerSurfaceInteractionHandler: (evt: string, handler: EventListener) => void;
  deregisterSurfaceInteractionHandler: (evt: string, handler: EventListener) => void;
  registerDocumentKeydownHandler: (handler: EventListener) => void;
  deregisterDocumentKeydownHandler: (handler: EventListener) => void;
  registerTransitionEndHandler: (handler: EventListener) => void;
  deregisterTransitionEndHandler: (handler: EventListener) => void;
  notifyAccept: () => void;
  notifyCancel: () => void;
  trapFocusOnSurface: () => void;
  untrapFocusOnSurface: () => void;
  isDialog: (el: Element) => boolean;
  layoutFooterRipples: () => void;
}

export interface MDCToolbarAdapter {
  hasClass: (className: string) => boolean;
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  registerScrollHandler: (handler: EventListener) => void;
  deregisterScrollHandler: (handler: EventListener) => void;
  registerResizeHandler: (handler: EventListener) => void;
  deregisterResizeHandler: (handler: EventListener) => void;
  getViewportWidth: () => number;
  getViewportScrollY: () => number;
  getOffsetHeight: () => number;
  getFirstRowElementOffsetHeight: () => number;
  notifyChange: (evtData: { flexibleExpansionRatio: number }) => void;
  setStyle: (property: string, value: string) => void;
  setStyleForTitleElement: (property: string, value: string) => void;
  setStyleForFlexibleRowElement: (property: string, value: string) => void;
  setStyleForFixedAdjustElement: (property: string, value: string) => void;
}

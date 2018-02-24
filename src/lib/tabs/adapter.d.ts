export interface MDCTabAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  registerInteractionHandler: (type: string, handler: EventListener) => void;
  deregisterInteractionHandler: (type: string, handler: EventListener) => void;
  getOffsetWidth: () => number;
  getOffsetLeft: () => number;
  notifySelected: () => void;
}

export interface MDCTabBarAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  bindOnMDCTabSelectedEvent: () => void;
  unbindOnMDCTabSelectedEvent: () => void;
  registerResizeHandler: (handler: EventListener) => void;
  deregisterResizeHandler: (handler: EventListener) => void;
  getOffsetWidth: () => number;
  setStyleForIndicator: (propertyName: string, value: string) => void;
  getOffsetWidthForIndicator: () => number;
  notifyChange: (evtData: { activeTabIndex: number }) => void;
  getNumberOfTabs: () => number;
  isTabActiveAtIndex: (index: number) => boolean;
  setTabActiveAtIndex: (index: number, isActive: boolean) => void;
  isDefaultPreventedOnClickForTabAtIndex: (index: number) => boolean;
  setPreventDefaultOnClickForTabAtIndex: (index: number, preventDefaultOnClick: boolean) => void;
  measureTabAtIndex: (index: number) => void;
  getComputedWidthForTabAtIndex: (index: number) => number;
  getComputedLeftForTabAtIndex: (index: number) => number;
}

export interface MDCTabBarScrollerAdapter {
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  eventTargetHasClass: (target: HTMLElement, className: string) => boolean;
  addClassToForwardIndicator: (className: string) => void;
  removeClassFromForwardIndicator: (className: string) => void;
  addClassToBackIndicator: (className: string) => void;
  removeClassFromBackIndicator: (className: string) => void;
  isRTL: () => boolean;
  registerBackIndicatorClickHandler: (handler: EventListener) => void;
  deregisterBackIndicatorClickHandler: (handler: EventListener) => void;
  registerForwardIndicatorClickHandler: (handler: EventListener) => void;
  deregisterForwardIndicatorClickHandler: (handler: EventListener) => void;
  registerCapturedInteractionHandler: (evt: string, handler: EventListener) => void;
  deregisterCapturedInteractionHandler: (evt: string, handler: EventListener) => void;
  registerWindowResizeHandler: (handler: EventListener) => void;
  deregisterWindowResizeHandler: (handler: EventListener) => void;
  getNumberOfTabs: () => number;
  getComputedWidthForTabAtIndex: (index: number) => number;
  getComputedLeftForTabAtIndex: (index: number) => number;
  getOffsetWidthForScrollFrame: () => number;
  getScrollLeftForScrollFrame: () => number;
  setScrollLeftForScrollFrame: (scrollLeftAmount: number) => void;
  getOffsetWidthForTabBar: () => number;
  setTransformStyleForTabBar: (value: string) => void;
  getOffsetLeftForEventTarget: (target: HTMLElement) => number;
  getOffsetWidthForEventTarget: (target: HTMLElement) => number;
}

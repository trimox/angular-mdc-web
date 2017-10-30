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

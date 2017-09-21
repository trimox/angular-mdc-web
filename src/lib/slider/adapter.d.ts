export interface MDCSliderAdapter {
  hasClass: (className: string) => boolean;
  addClass: (className: string) => void;
  removeClass: (className: string) => void;
  getAttribute: (name: string) => string | null;
  setAttribute: (name: string, value: string) => void;
  removeAttribute: (name: string) => void;
  computeBoundingRect: () => ClientRect;
  getTabIndex: () => number;
  registerInteractionHandler: (type: string, handler: EventListener) => void;
  deregisterInteractionHandler: (type: string, handler: EventListener) => void;
  registerThumbContainerInteractionHandler: (type: string, handler: EventListener) => void;
  deregisterThumbContainerInteractionHandler: (type: string, handler: EventListener) => void;
  registerBodyInteractionHandler: (type: string, handler: EventListener) => void;
  deregisterBodyInteractionHandler: (type: string, handler: EventListener) => void;
  registerResizeHandler: (handler: EventListener) => void;
  deregisterResizeHandler: (handler: EventListener) => void;
  notifyInput: () => void;
  notifyChange: () => void;
  setThumbContainerStyleProperty: (propertyName: string, value: string) => void;
  setTrackStyleProperty: (propertyName: string, value: string) => void;
  setMarkerValue: (value: number) => void;
  appendTrackMarkers: (numMarkers: number) => void;
  removeTrackMarkers: () => void;
  setLastTrackMarkersStyleProperty: (propertyName: string, value: string) => void;
  isRTL: () => boolean;
}

export interface MDCLinearProgressAdapter {
  addClass: (className: string) => void;
  getPrimaryBar: () => Element;
  getBuffer: () => Element;
  hasClass: (className: string) => void;
  removeClass: (className: string) => void;
  setStyle: (el: Element, styleProperty: string, value: number) => void;
}

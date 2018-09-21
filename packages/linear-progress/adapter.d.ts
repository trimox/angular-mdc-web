export interface MDCLinearProgressAdapter {
  addClass: (className: string) => void;
  getPrimaryBar: () => Element | null;
  getBuffer: () => Element | null;
  hasClass: (className: string) => void;
  removeClass: (className: string) => void;
  setStyle: (el: HTMLElement, styleProperty: string, value: string) => void;
}

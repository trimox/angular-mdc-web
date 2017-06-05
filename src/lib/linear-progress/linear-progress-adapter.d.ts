export interface MDCLinearProgressAdapter {
  addClass: (string) => void
  getPrimaryBar: () => Element
  getBuffer: () => Element
  hasClass: (string) => void
  removeClass: (string) => void
  setStyle: (el: Element, styleProperty: string, value: number) => void
}
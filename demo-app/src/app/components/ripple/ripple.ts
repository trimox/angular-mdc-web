import {
	ElementRef,
	Injectable,
	Renderer2
} from '@angular/core';

import '@material/ripple/mdc-ripple.scss';

export function getMatchesProperty(HTMLElementPrototype) {
	return [
		'webkitMatchesSelector', 'msMatchesSelector', 'matches',
	].filter((p) => p in HTMLElementPrototype).pop();
}

const MATCHES = getMatchesProperty(HTMLElement.prototype);
const {MDCRipple, MDCRippleFoundation} = require('@material/ripple');

@Injectable()
export class Ripple {
	public unbounded: false; /* Set to true for checkbox and radio button */

	rippleFoundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this),
		{
			isUnbounded: () => this.unbounded,
			isSurfaceActive: () => this._root[MATCHES](':active'),
			addClass: (className: string) => {
				const {_renderer: renderer, _root: root} = this;
				renderer.addClass(root.nativeElement, className);
			},
			removeClass: (className: string) => {
				const {_renderer: renderer, _root: root} = this;
				renderer.removeClass(root.nativeElement, className);
			},
			registerInteractionHandler: (evtType: string, handler: EventListener) => {
				if(this._root) {
					this._root.nativeElement.addEventListener(evtType, handler);
				}
			},
			deregisterInteractionHandler: (evtType: string, handler: EventListener) => {
				if(this._root) {
					this._root.nativeElement.removeEventListener(evtType, handler);
				}
			},
			updateCssVariable: (varName: string, value: string) => {
				if(this._root) {
					this._root.nativeElement.style.setProperty(varName, value);
				}
			},
			computeBoundingRect: () => {
				const {left, top, height, width} = this._root.nativeElement.getBoundingClientRect();
				return {
					top,
					left,
					right: left,
					bottom: top,
					width: width,
					height: height,
				};
			},
		}));

	constructor(private _renderer: Renderer2, private _root: ElementRef) { }
}

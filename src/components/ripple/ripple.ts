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
const { MDCRipple, MDCRippleFoundation } = require('@material/ripple');

type UnlistenerMap = WeakMap<EventListener, Function>;

@Injectable()
export class Ripple {
	public unbounded: false; /* Set to true for checkbox and radio button */
	private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

	rippleFoundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this),
		{
			isUnbounded: () => this.unbounded,
			isSurfaceActive: () => this._root[MATCHES](':active'),
			addClass: (className: string) => {
				const { _renderer: renderer, _root: root } = this;
				renderer.addClass(root.nativeElement, className);
			},
			removeClass: (className: string) => {
				const { _renderer: renderer, _root: root } = this;
				renderer.removeClass(root.nativeElement, className);
			},
			registerInteractionHandler: (evtType: string, handler: EventListener) => {
				if (this._root) {
					this.listen_(evtType, handler);
				}
			},
			deregisterInteractionHandler: (evtType: string, handler: EventListener) => {
				if (this._root) {
					this.unlisten_(evtType, handler);
				}
			},
			updateCssVariable: (varName: string, value: string) => {
				if (this._root) {
					this._root.nativeElement.style.setProperty(varName, value);
				}
			},
			computeBoundingRect: () => {
				const { left, top, height, width } = this._root.nativeElement.getBoundingClientRect();
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

	listen_(type: string, listener: EventListener, ref: ElementRef = this._root) {
		if (!this._unlisteners.has(type)) {
			this._unlisteners.set(type, new WeakMap<EventListener, Function>());
		}
		const unlistener = this._renderer.listen(ref.nativeElement, type, listener);
		this._unlisteners.get(type).set(listener, unlistener);
	}

	unlisten_(type: string, listener: EventListener) {
		if (!this._unlisteners.has(type)) {
			return;
		}
		const unlisteners = this._unlisteners.get(type);
		if (!unlisteners.has(listener)) {
			return;
		}
		unlisteners.get(listener)();
		unlisteners.delete(listener);
	}
}

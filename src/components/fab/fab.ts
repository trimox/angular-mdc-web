import {
	AfterViewInit,
	AfterContentInit,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	HostBinding,
	Renderer2,
	ViewEncapsulation
} from '@angular/core';

import { Ripple } from '../ripple';

const MDC_FAB_STYLES = require('@material/fab/mdc-fab.scss');

@Component({
	selector: 'mdc-fab',
	styles: [String(MDC_FAB_STYLES)],
	template: '<ng-content></ng-content>',
	encapsulation: ViewEncapsulation.None
})
export class FabComponent implements AfterViewInit, OnDestroy {
	@Input() mini: boolean;
	@Input() plain: boolean;
	@HostBinding('class') className: string = 'mdc-fab';
	@HostBinding('class.material-icons') classMaterialIcons: string = 'material-icons';
	@HostBinding('class.mdc-fab--mini') get classMini(): string {
		return this.mini ? 'mdc-fab--mini' : '';
	}
	@HostBinding('class.mdc-fab--plain') get classPlain(): string {
		return this.plain ? 'mdc-fab--plain' : '';
	}
	@HostBinding('tabindex') tabindex: number = 0;

	private _ripple: Ripple;

	constructor(private _renderer: Renderer2, private _root: ElementRef) { }

	ngAfterViewInit() {
		this._ripple = new Ripple(this._renderer, this._root);
		this._ripple.rippleFoundation.init();
	}
	ngOnDestroy() {
		this._ripple.rippleFoundation.destroy();
	}
}
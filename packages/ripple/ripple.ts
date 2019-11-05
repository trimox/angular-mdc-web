import {AfterViewInit, Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

import {MdcRipple, MDCRippleCapableSurface} from './ripple.service';

// rapropos 2019.11.02
// Ivy doesn't allow directives to inherit from components, so this merges
// what used to be the two. see the constructor for more information

@Directive({
    selector: 'mdc-ripple, [mdc-ripple], [mdcRipple]',
    providers: [MdcRipple],
})
export class MdcRippleDirective implements AfterViewInit, OnDestroy, MDCRippleCapableSurface {
    _root!: Element;

    get ripple(): MdcRipple {
        return this._ripple;
    }

    @Input()
    get attachTo(): any {
        return this._attachTo;
    }

    set attachTo(element: any) {
        if (this._attachTo) {
            this._attachTo.classList.remove('mdc-ripple-surface');
        }
        this._attachTo = element;
        if (this._attachTo) {
            this._attachTo.classList.add('mdc-ripple-surface');
        }
    }

    private _attachTo: any;

    @Input()
    get primary(): boolean {
        return this._primary;
    }

    set primary(value: boolean) {
        this._primary = coerceBooleanProperty(value);
        this._primary ? this.attachTo.classList.add('mdc-ripple-surface--primary')
            : this.attachTo.classList.remove('mdc-ripple-surface--primary');
    }

    private _primary: boolean = false;

    @Input()
    get secondary(): boolean {
        return this._secondary;
    }

    set secondary(value: boolean) {
        this._secondary = coerceBooleanProperty(value);
        this._secondary ? this.attachTo.classList.add('mdc-ripple-surface--accent')
            : this.attachTo.classList.remove('mdc-ripple-surface--accent');
    }

    private _secondary: boolean = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    private _disabled: boolean = false;

    @Input()
    get unbounded(): boolean {
        return this._unbounded;
    }

    set unbounded(value: boolean) {
        this._unbounded = coerceBooleanProperty(value);
    }

    protected _unbounded: boolean = false;

    constructor(
        private _ripple: MdcRipple,
        public elementRef: ElementRef<HTMLElement>) {
        this._root = this.elementRef.nativeElement;

        // rapropos 2019.11.02
        // the difference between the old component and directive was boundedness
        // and the presence of the 'data-mdc-ripple-is-unbounded' attribute. we
        // recreate that here by checking our tag name. if it is `MDC-RIPPLE',
        // then we are acting as the component did. otherwise, we act as the directive
        if (this._root.tagName !== 'MDC-RIPPLE') {
            this.unbounded = true;
            this._root.setAttribute('data-mdc-ripple-is-unbounded', '');
        }
    }

    ngAfterViewInit(): void {
        this._ripple = new MdcRipple(this.elementRef);
        this._ripple.init();
    }

    ngOnDestroy(): void {
        this.ripple.destroy();
    }
}


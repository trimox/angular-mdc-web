import {
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MDCLineRippleFoundation } from '@material/line-ripple';

@Directive({
  selector: '[mdcLineRipple], mdc-line-ripple',
  exportAs: 'mdcLineRipple',
  host: { 'class': 'mdc-line-ripple' }
})
export class MdcLineRipple implements OnInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _createAdapter() {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      setStyle: (propertyName: string, value: string) => this._getHostElement().style.setProperty(propertyName, value)
    };
  }

  private _foundation: {
    activate(): void,
    deactivate(): void,
    setRippleCenter(xCoordinate: number): void,
    handleTransitionEnd(evt: TransitionEvent): void
  } = new MDCLineRippleFoundation(this._createAdapter());

  constructor(
    private _ngZone: NgZone,
    public elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this._loadListeners();
  }

  destroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  /** Activates the line ripple */
  activate(): void {
    this._foundation.activate();
  }

  /** Deactivates the line ripple */
  deactivate(): void {
    this._foundation.deactivate();
  }

  /**
   * Sets the transform origin given a user's click location.
   * The `rippleCenter` is the x-coordinate of the middle of the ripple.
   */
  setRippleCenter(xCoordinate: number): void {
    this._foundation.setRippleCenter(xCoordinate);
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<TransitionEvent>(this._getHostElement(), 'transitionend')
        .pipe(takeUntil(this._destroy), filter((e: TransitionEvent) =>
          e.target === this._getHostElement()))
        .subscribe(evt => this._ngZone.run(() => this._foundation.handleTransitionEnd(evt))));
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}

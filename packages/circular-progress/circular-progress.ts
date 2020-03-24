import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {Platform} from '@angular/cdk/platform';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {MDCComponent} from '@angular-mdc/web/base';
import {MDCProgressIndicator} from '@material/progress-indicator/component';
import {MDCCircularProgressFoundation, MDCCircularProgressAdapter} from '@material/circular-progress';

@Component({
  selector: 'mdc-circular-progress',
  exportAs: 'mdcCircularProgress',
  host: {
    'role': 'progressbar',
    'class': 'mdc-circular-progress',
    '[class.mdc-circular-progress--indeterminate]': '!determinate',
    '[attr.aria-label]': 'label',
    'aria-valuemin': '0',
    'aria-valuemax': '100'
  },
  template: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcCircularProgress extends MDCComponent<MDCCircularProgressFoundation>
  implements MDCProgressIndicator, OnChanges, AfterViewInit {
  _root!: Element;

  private _initialized: boolean = false;

  /* Label indicating how the progress bar should be announced to the user. */
  @Input() label?: string = undefined;

  @Input()
  get progress(): number {
    return this._progress;
  }
  set progress(value: number) {
    this._progress = coerceNumberProperty(value);
  }
  private _progress = 0;

  @Input()
  get determinate(): boolean {
    return this._determinate;
  }
  set determinate(value: boolean) {
    this._determinate = coerceBooleanProperty(value);
  }
  private _determinate = false;

  private _determinateCircle!: HTMLElement;

  getDefaultFoundation() {
    const adapter: MDCCircularProgressAdapter = {
      addClass: (className: string) => this._root.classList.add(className),
      hasClass: (className: string) => this._root.classList.contains(className),
      removeClass: (className: string) => this._root.classList.remove(className),
      removeAttribute: (name: string) => this._root.removeAttribute(name),
      setAttribute: (name: string, value: string) => this._root.setAttribute(name, value),
      setDeterminateCircleAttribute: (attributeName: string, value: string) =>
        this._determinateCircle.setAttribute(attributeName, value),
      getDeterminateCircleAttribute: (attributeName: string) =>
        this._determinateCircle.getAttribute(attributeName)
    };
    return new MDCCircularProgressFoundation(adapter);
  }
  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) {
    super(elementRef);

    this._root = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this._platform.isBrowser) {
      this._initialized = true;
      this._determinateCircle =
        this._root.querySelector(MDCCircularProgressFoundation.strings.DETERMINATE_CIRCLE_SELECTOR) as HTMLElement;

      this._foundation.init();
      this._syncProgressWithFoundation();
      this._syncDeterminateWithFoundation();

      this._changeDetectorRef.markForCheck();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._initialized) {
      return;
    }

    if (changes['progress']) {
      this._syncProgressWithFoundation();
    }
    if (changes['determinate']) {
      this._syncDeterminateWithFoundation();
    }
  }

  open(): void {
    this._foundation.open();
  }

  close(): void {
    this._foundation.close();
  }

  private _syncProgressWithFoundation(): void {
    this._foundation.setProgress(this.progress);
  }

  private _syncDeterminateWithFoundation(): void {
    this._foundation.setDeterminate(this.determinate);
  }
}

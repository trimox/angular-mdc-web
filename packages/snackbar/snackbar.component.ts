import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MdcSnackbarRef, MdcSnackbarDismissReason } from './snackbar-ref';
import { MDC_SNACKBAR_DATA, MdcSnackbarConfig } from './snackbar-config';

import { announce } from '@material/snackbar/util';
import { MDCSnackbarFoundation } from '@material/snackbar/index';

@Component({
  moduleId: module.id,
  selector: 'mdc-snackbar',
  host: {
    'class': 'mdc-snackbar',
    '[dir]': 'this.config.direction',
    '[class.mdc-snackbar--stacked]': 'config.stacked',
    '[class.mdc-snackbar--leading]': 'config.leading',
    '[class.ngx-mdc-snackbar--trailing]': 'config.trailing'
  },
  template: `
  <div #surface class="mdc-snackbar__surface">
    <div #label class="mdc-snackbar__label"
      role="status"
      aria-live="polite">{{data.message}}</div>
    <div class="mdc-snackbar__actions" *ngIf="data.action">
      <button #action type="button" class="mdc-button mdc-snackbar__action"
        (click)="onActionClick($event)">{{data.action}}</button>
      <button #dismiss *ngIf="config.dismiss"
        class="mdc-icon-button mdc-snackbar__dismiss material-icons"
        title="Dismiss" (click)="onActionIconClick($event)">close</button>
    </div>
  </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcSnackbarComponent implements OnInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  @ViewChild('label') label!: ElementRef<HTMLElement>;
  @ViewChild('action') action?: ElementRef<HTMLButtonElement>;
  @ViewChild('dismiss') dismiss?: ElementRef<HTMLButtonElement>;

  get config(): MdcSnackbarConfig { return this.snackbarRef.componentInstance.snackbarConfig; }

  private _createAdapter() {
    return {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      announce: () => announce(this.label.nativeElement),
      notifyClosed: (reason: MdcSnackbarDismissReason) => this.snackbarRef.dismiss(reason)
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    open(): void,
    close(reason?: any): void,
    isOpen(): boolean,
    getTimeoutMs(): number,
    setTimeoutMs(timeoutMs: number): void,
    getCloseOnEscape(): boolean,
    setCloseOnEscape(closeOnEscape: boolean): void,
    handleKeyDown(evt: KeyboardEvent): void,
    handleActionButtonClick(evt: MouseEvent): void,
    handleActionIconClick(evt: MouseEvent): void
  } = new MDCSnackbarFoundation(this._createAdapter());

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    public snackbarRef: MdcSnackbarRef<MdcSnackbarComponent>,
    @Inject(MDC_SNACKBAR_DATA) public data: any) { }

  ngOnInit(): void {
    this._loadListeners();
    this._changeDetectorRef.detectChanges();

    this._applyClasses();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  onActionClick(evt: MouseEvent): void {
    this._foundation.handleActionButtonClick(evt);
  }

  onActionIconClick(evt: MouseEvent): void {
    this._foundation.handleActionIconClick(evt);
  }

  open(): void {
    this._foundation.open();
  }

  close(reason: MdcSnackbarDismissReason): void {
    this._foundation.close(reason);
  }

  private _applyClasses(): void {
    const classes = this.config.classes;
    if (classes) {
      if (classes instanceof Array) {
        this._getHostElement().classList.add(...this.config.classes as string[]);
      } else {
        this._getHostElement().classList.toggle(classes);
      }
    }

    const actionClasses = this.config.actionClasses;
    if (actionClasses && this.action) {
      if (actionClasses instanceof Array) {
        this.action.nativeElement.classList.add(...this.config.actionClasses as string[]);
      } else {
        this.action.nativeElement.classList.toggle(actionClasses);
      }
    }

    const dismissClasses = this.config.dismissClasses;
    if (dismissClasses && this.dismiss) {
      if (dismissClasses instanceof Array) {
        this.dismiss.nativeElement.classList.add(...this.config.dismissClasses as string[]);
      } else {
        this.dismiss.nativeElement.classList.toggle(dismissClasses);
      }
    }
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<KeyboardEvent>(this._getHostElement(), 'keydown').pipe(takeUntil(this._destroyed))
        .subscribe((evt) => this._ngZone.run(() => this._foundation.handleKeyDown(evt))));
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}

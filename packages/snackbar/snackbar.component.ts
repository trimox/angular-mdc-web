import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

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
    '[class.ngx-mdc-snackbar--trailing]': 'config.trailing',
    '(keydown)': '_onKeydown($event)'
  },
  template: `
  <div #surface class="mdc-snackbar__surface">
    <div #label class="mdc-snackbar__label"
      role="status"
      aria-live="polite">{{data.message}}</div>
    <div class="mdc-snackbar__actions" *ngIf="data.action">
      <button #action type="button" class="mdc-button mdc-snackbar__action"
        (click)="_onActionClick($event)">{{data.action}}</button>
      <button #dismiss *ngIf="config.dismiss"
        class="mdc-icon-button mdc-snackbar__dismiss material-icons"
        title="Dismiss" (click)="_onActionIconClick($event)">close</button>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcSnackbarComponent implements OnInit, OnDestroy {
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
    destroy(): void,
    open(): void,
    close(reason?: any): void,
    setTimeoutMs(timeoutMs: number): void,
    setCloseOnEscape(closeOnEscape: boolean): void,
    handleKeyDown(evt: KeyboardEvent): void,
    handleActionButtonClick(evt: MouseEvent): void,
    handleActionIconClick(evt: MouseEvent): void
  } = new MDCSnackbarFoundation(this._createAdapter());

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    public snackbarRef: MdcSnackbarRef<MdcSnackbarComponent>,
    @Inject(MDC_SNACKBAR_DATA) public data: any) { }

  ngOnInit(): void {
    this._changeDetectorRef.detectChanges();

    this._applyClasses();
    this._applyConfig();
  }

  ngOnDestroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  _onKeydown(evt: KeyboardEvent): void {
    this._foundation.handleKeyDown(evt);
  }

  _onActionClick(evt: MouseEvent): void {
    this._foundation.handleActionButtonClick(evt);
  }

  _onActionIconClick(evt: MouseEvent): void {
    this._foundation.handleActionIconClick(evt);
  }

  open(): void {
    this._foundation.open();
  }

  close(reason?: MdcSnackbarDismissReason): void {
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

    if (this.dismiss) {
      const dismissClasses = this.config.dismissClasses;
      if (dismissClasses) {
        if (dismissClasses instanceof Array) {
          this.dismiss.nativeElement.classList.add(...this.config.dismissClasses as string[]);
        } else {
          this.dismiss.nativeElement.classList.toggle(dismissClasses);
        }
      }
    }
  }

  private _applyConfig(): void {
    if (this.config.timeoutMs) {
      this._foundation.setTimeoutMs(this.config.timeoutMs);
    }
    if (this.config.dismiss) {
      this._foundation.setCloseOnEscape(this.config.closeOnEscape ? true : false);
    }
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}

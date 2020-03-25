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
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MDCComponent} from '@angular-mdc/web/base';
import {MdcSnackbarRef, MdcSnackbarDismissReason} from './snackbar-ref';
import {MDC_SNACKBAR_DATA, MdcSnackbarConfig} from './snackbar-config';
import {MDCSnackbarFoundation, MDCSnackbarAdapter} from '@material/snackbar';

@Component({
  selector: 'mdc-snackbar',
  host: {
    'class': 'mdc-snackbar',
    '[dir]': 'config.direction',
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
    <div class="mdc-snackbar__actions">
      <button #action type="button" class="mdc-button mdc-snackbar__action"
        (click)="_onActionClick($event)">{{data.action}}</button>
      <button #dismiss *ngIf="config.dismiss"
        class="mdc-icon-button mdc-snackbar__dismiss material-icons"
        title="Dismiss" (click)="_onActionIconClick($event)">close</button>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [LiveAnnouncer]
})
export class MdcSnackbarComponent extends MDCComponent<MDCSnackbarFoundation> implements OnInit, OnDestroy {
  _root!: Element;

  @ViewChild('label', {static: true}) label!: ElementRef<HTMLElement>;
  @ViewChild('action', {static: false}) action?: ElementRef<HTMLButtonElement>;
  @ViewChild('dismiss', {static: false}) dismiss?: ElementRef<HTMLButtonElement>;

  get config(): MdcSnackbarConfig {
    return this.snackbarRef.componentInstance.snackbarConfig;
  }

  getDefaultFoundation() {
    const adapter: Omit<MDCSnackbarAdapter, 'notifyClosing' | 'notifyOpened' | 'notifyOpening'> = {
      addClass: (className: string) => this._root.classList.add(className),
      removeClass: (className: string) => this._root.classList.remove(className),
      announce: () => this.label.nativeElement ? this._liveAnnouncer.announce(this.config.data.message,
        this.config.politeness, this.config.timeoutMs || MDCSnackbarFoundation.numbers.ARIA_LIVE_DELAY_MS) : {},
      notifyClosed: (reason: MdcSnackbarDismissReason | string) => this.snackbarRef.dismiss(reason)
    };
    return new MDCSnackbarFoundation(adapter);
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    public elementRef: ElementRef<HTMLElement>,
    public snackbarRef: MdcSnackbarRef<MdcSnackbarComponent>,
    @Inject(MDC_SNACKBAR_DATA) public data: any) {
    super(elementRef);

    this._root = this.elementRef.nativeElement;
  }

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
    this._foundation.close(reason !== undefined ? reason.action ? 'action' : reason.dismiss ? 'dismiss' : '' : '');
  }

  private _applyClasses(): void {
    const classes = this.config.classes;
    if (classes) {
      if (classes instanceof Array) {
        this._elementRef.nativeElement.classList.add(...this.config.classes as string[]);
      } else {
        this._root.classList.toggle(classes);
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
}

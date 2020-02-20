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
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [LiveAnnouncer]
})
export class MdcSnackbarBase extends MDCComponent<MDCSnackbarFoundation> implements OnInit, OnDestroy {
  @ViewChild('label', {static: true}) label!: ElementRef<HTMLElement>;
  @ViewChild('action', {static: false}) action?: ElementRef<HTMLButtonElement>;
  @ViewChild('dismiss', {static: false}) dismiss?: ElementRef<HTMLButtonElement>;

  get config(): MdcSnackbarConfig {
    return this.snackbarRef.componentInstance.snackbarConfig;
  }

  getDefaultFoundation() {
    const adapter: MDCSnackbarAdapter = {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      announce: () => this.label.nativeElement ? this.liveAnnouncer.announce(this.config.data.message,
        this.config.politeness, this.config.timeoutMs || MDCSnackbarFoundation.numbers.ARIA_LIVE_DELAY_MS) : {},
      notifyClosing: () => {},
      notifyOpened: () => {},
      notifyOpening: () => {},
      notifyClosed: (reason: MdcSnackbarDismissReason | string) => this.snackbarRef.dismiss(reason)
    };
    return new MDCSnackbarFoundation(adapter);
  }

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public liveAnnouncer: LiveAnnouncer,
    public elementRef: ElementRef<HTMLElement>,
    public snackbarRef: MdcSnackbarRef<any>,
    @Inject(MDC_SNACKBAR_DATA) public data: any) {
    super(elementRef);
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();

    this._applyClasses();
    this._applyConfig();
  }

  ngOnDestroy(): void {
    this._foundation?.destroy();
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

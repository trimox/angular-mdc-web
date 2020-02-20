import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import {MdcSnackbarRef} from './snackbar-ref';
import {MDC_SNACKBAR_DATA} from './snackbar-config';
import {MdcSnackbarBase} from './snackbar-base';

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
  encapsulation: ViewEncapsulation.None,
  providers: [LiveAnnouncer]
})
export class MdcSnackbarComponent extends MdcSnackbarBase {
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    liveAnnouncer: LiveAnnouncer,
    elementRef: ElementRef<HTMLElement>,
    snackbarRef: MdcSnackbarRef<any>,
    @Inject(MDC_SNACKBAR_DATA) public data: any) {
    super(changeDetectorRef, liveAnnouncer, elementRef, snackbarRef, data);
  }
}

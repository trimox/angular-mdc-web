import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular-mdc/web/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EmbeddedViewRef,
  NgZone,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { MdcSnackbarConfig } from './snackbar-config';

@Component({
  moduleId: module.id,
  selector: 'mdc-snackbar-container',
  template: '<ng-template cdkPortalOutlet></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcSnackbarContainer extends BasePortalOutlet implements OnDestroy {
  /** The portal outlet inside of this container into which the snackbar content will be loaded. */
  @ViewChild(CdkPortalOutlet) _portalOutlet!: CdkPortalOutlet;

  /** Subject for notifying that the snackbar has exited from view. */
  readonly _onExit: Subject<any> = new Subject();

  constructor(
    private _ngZone: NgZone,
    public snackbarConfig: MdcSnackbarConfig) {

    super();
  }

  /** Attach a component portal as content to this snackbar container. */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /** Attach a template portal as content to this snackbar container. */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  ngOnDestroy() {
    this._completeExit();
  }

  /**
   * Waits for the zone to settle before removing the element. Helps prevent
   * errors where we end up removing an element which is in the middle of an animation.
   */
  private _completeExit() {
    this._ngZone.onMicrotaskEmpty.asObservable().pipe(take(1)).subscribe(() => {
      this._onExit.next();
      this._onExit.complete();
    });
  }
}

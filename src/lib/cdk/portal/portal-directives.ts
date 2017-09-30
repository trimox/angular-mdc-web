/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  NgModule,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  TemplateRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnDestroy,
  Input,
} from '@angular/core';
import { Portal, ComponentPortal, BasePortalHost } from './portal';

/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <ng-template [cdkPortalHost]="greeting"></ng-template>
 */
@Directive({
  selector: '[cdkPortalHost], [portalHost]',
  inputs: ['portal: cdkPortalHost']
})
export class PortalHostDirective extends BasePortalHost implements OnDestroy {
  /** The attached portal. */
  private _portal: Portal<any> | null = null;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef) {
    super();
  }

  /** Portal associated with the Portal host. */
  get portal(): Portal<any> | null {
    return this._portal;
  }

  set portal(portal: Portal<any> | null) {
    if (this.hasAttached()) {
      super.detach();
    }

    if (portal) {
      super.attach(portal);
    }

    this._portal = portal;
  }

  ngOnDestroy() {
    super.dispose();
    this._portal = null;
  }

  /**
   * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
   *
   * @param portal Portal to be attached to the portal host.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    portal.setAttachedHost(this);

    // If the portal specifies an origin, use that as the logical location of the component
    // in the application tree. Otherwise use the location of this PortalHost.
    let viewContainerRef = portal.viewContainerRef != null ?
      portal.viewContainerRef :
      this._viewContainerRef;

    let componentFactory =
      this._componentFactoryResolver.resolveComponentFactory(portal.component);
    let ref = viewContainerRef.createComponent(
      componentFactory, viewContainerRef.length,
      portal.injector || viewContainerRef.parentInjector);

    super.setDisposeFn(() => ref.destroy());
    this._portal = portal;

    return ref;
  }
}

@NgModule({
  exports: [PortalHostDirective],
  declarations: [PortalHostDirective],
})
export class PortalModule { }

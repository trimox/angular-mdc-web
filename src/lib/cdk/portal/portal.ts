/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  ViewContainerRef,
} from '@angular/core';

export interface ComponentType<T> {
  new (...args: any[]): T;
}

/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 */
export abstract class Portal<T> {
  private _attachedHost: PortalHost | null;

  /** Attach this portal to a host. */
  attach(host: PortalHost): T {
    this._attachedHost = host;
    return <T>host.attach(this);
  }

  /** Detach this portal from its host */
  detach(): void {
    let host = this._attachedHost;

    this._attachedHost = null;
    host.detach();
  }

  /** Whether this portal is attached to a host. */
  get isAttached(): boolean {
    return this._attachedHost != null;
  }

  /**
   * Sets the PortalHost reference without performing `attach()`. This is used directly by
   * the PortalHost when it is performing an `attach()` or `detach()`.
   */
  setAttachedHost(host: PortalHost | null) {
    this._attachedHost = host;
  }
}


/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
export class ComponentPortal<T> extends Portal<ComponentRef<T>> {
  /** The type of the component that will be instantiated for attachment. */
  component: ComponentType<T>;

  /**
   * [Optional] Where the attached component should live in Angular's *logical* component tree.
   * This is different from where the component *renders*, which is determined by the PortalHost.
   * The origin is necessary when the host is outside of the Angular application context.
   */
  viewContainerRef?: ViewContainerRef | null;

  /** [Optional] Injector used for the instantiation of the component. */
  injector?: Injector | null;

  constructor(
    component: ComponentType<T>,
    viewContainerRef?: ViewContainerRef | null,
    injector?: Injector | null) {
    super();
    this.component = component;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
  }
}

/**
 * A `PortalHost` is an space that can contain a single `Portal`.
 */
export interface PortalHost {
  attach(portal: Portal<any>): any;

  detach(): any;

  dispose(): void;

  hasAttached(): boolean;
}

/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 */
export abstract class BasePortalHost implements PortalHost {
  /** The portal currently attached to the host. */
  private _attachedPortal: Portal<any> | null;

  /** A function that will permanently dispose this host. */
  private _disposeFn: (() => void) | null;

  /** Whether this host has already been permanently disposed. */
  private _isDisposed: boolean = false;

  /** Whether this host has an attached portal. */
  hasAttached(): boolean {
    return !!this._attachedPortal;
  }

  attach(portal: Portal<any>): any {
    if (portal instanceof ComponentPortal) {
      this._attachedPortal = portal;
      return this.attachComponentPortal(portal);
    }
  }

  abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;

  detach(): void {
    if (this._attachedPortal) {
      this._attachedPortal.setAttachedHost(null);
      this._attachedPortal = null;
    }

    this._invokeDisposeFn();
  }

  dispose() {
    if (this.hasAttached()) {
      this.detach();
    }

    this._invokeDisposeFn();
    this._isDisposed = true;
  }

  setDisposeFn(fn: () => void) {
    this._disposeFn = fn;
  }

  private _invokeDisposeFn() {
    if (this._disposeFn) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }
}

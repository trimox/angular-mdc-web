/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ViewContainerRef,
  ElementRef,
  ComponentRef,
  EmbeddedViewRef,
  Injector
} from '@angular/core';

/** Interface that can be used to generically type a class. */
export interface ComponentType<T> {
  new(...args: any[]): T;
}

/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalOutlet`.
 */
export abstract class Portal<T> {
  private _attachedHost: PortalOutlet | null;

  /** Attach this portal to a host. */
  attach(host: PortalOutlet): T {
    this._attachedHost = host;
    return <T>host.attach(this);
  }

  /** Detach this portal from its host */
  detach(): void {
    const host = this._attachedHost;

    this._attachedHost = null;
    host.detach();
  }

  /** Whether this portal is attached to a host. */
  get isAttached(): boolean {
    return this._attachedHost != null;
  }

  /**
   * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
   * the PortalOutlet when it is performing an `attach()` or `detach()`.
   */
  setAttachedHost(host: PortalOutlet | null) {
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
   * This is different from where the component *renders*, which is determined by the PortalOutlet.
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

/** A `PortalOutlet` is an space that can contain a single `Portal`. */
export interface PortalOutlet {
  /** Attaches a portal to this outlet. */
  attach(portal: Portal<any>): any;

  /** Detaches the currently attached portal from this outlet. */
  detach(): any;

  /** Performs cleanup before the outlet is destroyed. */
  dispose(): void;

  /** Whether there is currently a portal attached to this outlet. */
  hasAttached(): boolean;
}

/**
 * Partial implementation of PortalOutlet that handles attaching
 * ComponentPortal and TemplatePortal.
 */
export abstract class BasePortalOutlet implements PortalOutlet {
  /** The portal currently attached to the host. */
  protected _attachedPortal: Portal<any> | null;

  /** A function that will permanently dispose this host. */
  private _disposeFn: (() => void) | null;

  /** Whether this host has already been permanently disposed. */
  private _isDisposed: boolean = false;

  /** Whether this host has an attached portal. */
  hasAttached(): boolean {
    return !!this._attachedPortal;
  }

  attach<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  attach(portal: any): any;

  /** Attaches a portal. */
  attach(portal: Portal<any>): any {
    if (portal instanceof ComponentPortal) {
      this._attachedPortal = portal;
      return this.attachComponentPortal(portal);
    }
  }

  abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;

  /** Detaches a previously attached portal. */
  detach(): void {
    if (this._attachedPortal) {
      this._attachedPortal.setAttachedHost(null);
      this._attachedPortal = null;
    }

    this._invokeDisposeFn();
  }

  /** Permanently dispose of this portal host. */
  dispose(): void {
    if (this.hasAttached()) {
      this.detach();
    }

    this._invokeDisposeFn();
    this._isDisposed = true;
  }

  /** @docs-private */
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

import {
  AfterContentInit,
  ContentChildren,
  Directive,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkWithHref
} from '@angular/router';
import { filter } from 'rxjs/operators/filter';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

export interface MdcRouteEvent {
  active: boolean;
}

@Directive({
  selector: '[mdcRouter]',
  exportAs: 'mdcRouter'
})
export class MdcRouter implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  /** Event emitted when the link is set active. */
  @Output() readonly routeChange: EventEmitter<MdcRouteEvent> = new EventEmitter<MdcRouteEvent>();

  @ContentChildren(RouterLink, { descendants: true }) _routerlinks: QueryList<RouterLink>;
  @ContentChildren(RouterLinkWithHref, { descendants: true }) _routerHrefLinks: QueryList<RouterLinkWithHref>;

  constructor(private _router: Router) {
    this._router.events
      .pipe(takeUntil(this._destroy),
        filter(event => event instanceof NavigationEnd)).subscribe(_ => {
          this._refreshActiveLink();
        });
  }

  ngAfterContentInit(): void {
    this._listenToLinkChanges();
    this._listenToHrefLinkChanges();

    this._refreshActiveLink();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  private _listenToLinkChanges(): void {
    this._routerlinks.changes
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this._refreshActiveLink();
      });
  }

  private _listenToHrefLinkChanges(): void {
    this._routerHrefLinks.changes
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this._refreshActiveLink();
      });
  }

  private _refreshActiveLink(): void {
    if (!this._isRouterActivated()) { return; }

    this._emitActivated(this._linkState());
  }

  private _isRouterActivated() {
    return (!this._routerlinks || !this._routerHrefLinks
      || !this._router.navigated) ? false : true;
  }

  private _linkState(): boolean {
    return this._routerlinks.some(this.isLinkActive())
      || this._routerHrefLinks.some(this.isLinkActive());
  }

  private isLinkActive(): (route: (RouterLinkWithHref | RouterLink)) => boolean {
    return (route: RouterLinkWithHref | RouterLink) => this._router.isActive(route.urlTree, false);
  }

  /** Emits an activated link event. */
  private _emitActivated(active: boolean): void {
    this.routeChange.emit({ active: active });
  }
}

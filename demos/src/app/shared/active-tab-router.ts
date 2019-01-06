import {
  AfterContentInit,
  ContentChildren,
  Directive,
  Inject,
  Input,
  NgModule,
  OnDestroy,
  QueryList
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink
} from '@angular/router';
import { filter, takeUntil, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MDC_TAB_BAR_PARENT_COMPONENT, MdcTabBarParentComponent } from '@angular-mdc/web';

@Directive({ selector: '[activeTabRouter]' })
export class ActiveTabRouter implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  @Input() routerLinkActiveOptions: { exact: boolean } = { exact: false };
  @ContentChildren(RouterLink, { descendants: true }) links: QueryList<RouterLink>;

  constructor(
    private _router: Router,
    @Inject(MDC_TAB_BAR_PARENT_COMPONENT) private _parent: MdcTabBarParentComponent) {

    this._router.events.pipe(takeUntil(this._destroyed),
      filter(event => event instanceof NavigationEnd))
      .subscribe(_ => this._detectChanges());
  }

  ngAfterContentInit(): void {
    this.links.changes.pipe(startWith(null), takeUntil(this._destroyed))
      .subscribe(() => this._detectChanges());
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private _detectChanges(): void {
    if (!this.links || !this._router.navigated) { return; }

    const hasActiveLinks = this._hasActiveLinks();
    if (hasActiveLinks) {
      const activeLinkIndex = this.links.toArray().findIndex((_) =>
        this._router.isActive(_.urlTree, this.routerLinkActiveOptions.exact));

      if (activeLinkIndex > -1) {
        this._parent.activateTab(activeLinkIndex);
      }
    }
  }

  private _isLinkActive(router: Router): (link: (RouterLink)) => boolean {
    return (link: RouterLink) =>
      router.isActive(link.urlTree, this.routerLinkActiveOptions.exact);
  }

  private _hasActiveLinks(): boolean {
    return this.links.some(this._isLinkActive(this._router));
  }
}

@NgModule({
  declarations: [ActiveTabRouter],
  exports: [ActiveTabRouter]
})
export class ActiveTabRouterModule { }

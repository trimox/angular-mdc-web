import { Component, NgZone, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const SMALL_WIDTH_BREAKPOINT = 1240;

import { MdcDrawer, MdcTopAppBar } from '@angular-mdc/web';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.html'
})
export class AppLayout implements OnInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  matcher: MediaQueryList;

  @ViewChild('demoTopAppBarControls') demoTopAppBarControls;
  @ViewChild('topAppBar') topAppBar: MdcTopAppBar;
  @ViewChild('appdrawer') appdrawer: MdcDrawer;

  startVisible: boolean;

  navigationLinks = [
    { name: 'Button', route: 'button-demo' },
    { name: 'Card', route: 'card-demo' },
    { name: 'Checkbox', route: 'checkbox-demo' },
    { name: 'Chips', route: 'chips-demo' },
    { name: 'Dialog', route: 'dialog-demo' },
    { name: 'Drawer', route: 'drawer-demo' },
    { name: 'Elevation', route: 'elevation-demo' },
    { name: 'FAB', route: 'fab-demo' },
    { name: 'Form Field', route: 'form-field-demo' },
    { name: 'Icon Button', route: 'icon-button-demo' },
    { name: 'Icon', route: 'icon-demo' },
    { name: 'Image List', route: 'image-list-demo' },
    { name: 'Linear Progress', route: 'linear-progress-demo' },
    { name: 'List', route: 'list-demo' },
    { name: 'Menu Surface', route: 'menu-surface-demo' },
    { name: 'Menu', route: 'menu-demo' },
    { name: 'Radio Buttons', route: 'radio-demo' },
    { name: 'Ripple', route: 'ripple-demo' },
    { name: 'Select', route: 'select-demo' },
    { name: 'Slider', route: 'slider-demo' },
    { name: 'Snackbar', route: 'snackbar-demo' },
    { name: 'Switch', route: 'switch-demo' },
    { name: 'Tabs', route: 'tabs-demo' },
    { name: 'Text Field', route: 'text-field-demo' },
    { name: 'Top App Bar', route: 'top-app-bar-demo' },
    { name: 'Typography', route: 'typography-demo' }
  ];

  startRoutes = [
    { name: 'Installation', route: 'getting-started' }
  ];

  constructor(
    private _router: Router,
    private _ngZone: NgZone) { }

  isScreenSmall(): boolean {
    return this.matcher.matches;
  }

  ngOnInit(): void {
    this.matcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
    this.matcher.addListener((event: MediaQueryListEvent) => this._ngZone.run(() => event.matches));

    this._router.events
      .pipe(takeUntil(this._destroy),
        filter(event => event instanceof NavigationEnd))
      .subscribe(_ => {
        if (this._router.url.includes('/top-app-bar-demo')) {
          this.demoTopAppBarControls.nativeElement.style.display = 'block';
        } else {
          this.demoTopAppBarControls.nativeElement.style.display = 'none';

          // reset to fixed after navigation away from top-app-bar demo
          this.topAppBar.fixed = true;
          this.topAppBar.prominent = false;
          this.topAppBar.dense = false;
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  onDrawerSelect(route: any) {
    this._router.navigate([route]);
    if (this.isScreenSmall()) {
      this.appdrawer.open = false;
    }
  }
}

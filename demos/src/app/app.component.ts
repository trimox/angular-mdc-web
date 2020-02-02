import {Component, OnInit, NgZone, ViewChild} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import {environment} from '../environments/environment';

import {MdcDrawer, MdcTopAppBar} from '@angular-mdc/web';

const SMALL_WIDTH_BREAKPOINT = 1240;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  version: string = environment.version;
  matcher: MediaQueryList;

  @ViewChild('topAppBar', {static: false}) topAppBar: MdcTopAppBar;
  @ViewChild('appDrawer', {static: false}) appDrawer: MdcDrawer;

  foundationVisible: boolean = false;

  navigationLinks = [
    {name: 'Button', route: 'button-demo'},
    {name: 'Card', route: 'card-demo'},
    {name: 'Checkbox', route: 'checkbox-demo'},
    {name: 'Chips', route: 'chips-demo'},
    {name: 'Data Table', route: 'data-table-demo'},
    {name: 'Dialog', route: 'dialog-demo'},
    {name: 'Drawer', route: 'drawer-demo'},
    {name: 'FAB', route: 'fab-demo'},
    {name: 'Form Field', route: 'form-field-demo'},
    {name: 'Icon Button', route: 'icon-button-demo'},
    {name: 'Icon', route: 'icon-demo'},
    {name: 'Image List', route: 'image-list-demo'},
    {name: 'Linear Progress', route: 'linear-progress-demo'},
    {name: 'List', route: 'list-demo'},
    {name: 'Menu', route: 'menu-demo'},
    {name: 'Menu Surface', route: 'menu-surface-demo'},
    {name: 'Radio Buttons', route: 'radio-demo'},
    {name: 'Select', route: 'select-demo'},
    {name: 'Slider', route: 'slider-demo'},
    {name: 'Snackbar', route: 'snackbar-demo'},
    {name: 'Switch', route: 'switch-demo'},
    {name: 'Tabs', route: 'tabs-demo'},
    {name: 'Text Field', route: 'text-field-demo'},
    {name: 'Top App Bar', route: 'top-app-bar-demo'}
  ];

  foundationRoutes = [
    {name: 'Elevation', route: 'elevation-demo'},
    {name: 'Ripple', route: 'ripple-demo'},
    {name: 'Shape', route: 'shape-docs'},
    {name: 'Theme', route: 'theme-docs'},
    {name: 'Typography', route: 'typography-demo'}
  ];

  constructor(
    private _router: Router,
    private _ngZone: NgZone) {}

  isScreenSmall(): boolean {
    return this.matcher.matches;
  }

  ngOnInit() {
    if (environment.production) {
      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      });
    }

    this.matcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
    this.matcher.addListener((event: MediaQueryListEvent) => this._ngZone.run(() => event.matches));
  }

  onDrawerSelect(route?: string) {
    if (route) {
      this._router.navigate([route]);
    }

    if (this.isScreenSmall()) {
      this.appDrawer.open = false;
    }
  }
}

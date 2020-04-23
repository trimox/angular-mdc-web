import {Component, OnInit, NgZone, ViewChild} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import {environment} from '../environments/environment';

import {MdcDrawer} from '@angular-mdc/web/drawer';
import {MdcTopAppBar} from '@angular-mdc/web/top-app-bar';

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
    {name: 'Button', route: 'button'},
    {name: 'Card', route: 'card'},
    {name: 'Checkbox', route: 'checkbox'},
    {name: 'Chips', route: 'chips'},
    {name: 'Data Table', route: 'data-table'},
    {name: 'Dialog', route: 'dialog'},
    {name: 'Drawer', route: 'drawer'},
    {name: 'FAB', route: 'fab'},
    {name: 'Form Field', route: 'form-field'},
    {name: 'Icon', route: 'icon'},
    {name: 'Icon Button', route: 'icon-button'},
    {name: 'Image List', route: 'image-list'},
    {name: 'Linear Progress', route: 'linear-progress'},
    {name: 'List', route: 'list'},
    {name: 'Menu', route: 'menu'},
    {name: 'Menu Surface', route: 'menu-surface'},
    {name: 'Radio Buttons', route: 'radio'},
    {name: 'Select', route: 'select'},
    {name: 'Slider', route: 'slider'},
    {name: 'Snackbar', route: 'snackbar'},
    {name: 'Switch', route: 'switch'},
    {name: 'Tabs', route: 'tabs'},
    {name: 'Textarea', route: 'textarea'},
    {name: 'Text Field', route: 'text-field'},
    {name: 'Top App Bar', route: 'top-app-bar'}
  ];

  foundationRoutes = [
    {name: 'Elevation', route: 'elevation'},
    {name: 'Ripple', route: 'ripple'},
    {name: 'Shape', route: 'shape'},
    {name: 'Theme', route: 'theme'},
    {name: 'Typography', route: 'typography'}
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

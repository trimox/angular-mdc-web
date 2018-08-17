import { Component, NgZone, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const SMALL_WIDTH_BREAKPOINT = 1240;

import { MdcAppBar } from '@angular-mdc/web';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.html'
})
export class AppLayout implements OnInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  @ViewChild('demoAppBarControls') demoAppBarControls;
  @ViewChild(MdcAppBar) appBar: MdcAppBar;

  startVisible: boolean;
  buttonVisible: boolean;
  inputVisible: boolean;
  listVisible: boolean;

  navigationLinks = [
    { name: 'App Bar', route: 'app-bar-demo', icon: 'remove' },
    { name: 'Card', route: 'card-demo', icon: 'credit_card' },
    { name: 'Chips', route: 'chips-demo', icon: 'indeterminate_check_box' },
    { name: 'Dialog', route: 'dialog-demo', icon: 'question_answer' },
    { name: 'Drawer', route: 'drawer-demo', icon: 'code' },
    { name: 'Elevation', route: 'elevation-demo', icon: 'filter_none' },
    { name: 'Icon', route: 'icon-demo', icon: 'star' },
    { name: 'Linear Progress', route: 'linear-progress-demo', icon: 'compare_arrows' },
    { name: 'Menu', route: 'menu-demo', icon: 'menu' },
    { name: 'Ripple', route: 'ripple-demo', icon: 'code' },
    { name: 'Snackbar', route: 'snackbar-demo', icon: 'info_outline' },
    { name: 'Shape', route: 'shape-demo', icon: 'transform' },
    { name: 'Tabs', route: 'tabs-demo', icon: 'tab' },
    { name: 'Typography', route: 'typography-demo', 'icon': 'title' }
  ];

  inputRoutes = [
    { name: 'Checkbox', route: 'checkbox-demo' },
    { name: 'Form Field', route: 'form-field-demo' },
    { name: 'Radio Buttons', route: 'radio-demo' },
    { name: 'Select', route: 'select-demo' },
    { name: 'Slider', route: 'slider-demo' },
    { name: 'Switch', route: 'switch-demo' },
    { name: 'Text Field', route: 'textfield-demo' }
  ];

  buttonRoutes = [
    { name: 'Button', route: '/button-demo' },
    { name: 'FAB', route: '/fab-demo' },
    { name: 'Icon Button', route: '/icon-button-demo' }
  ];

  listRoutes = [
    { name: 'List', route: 'list-demo' },
    { name: 'Grid List', route: 'grid-list-demo' },
    { name: 'Image List', route: 'image-list-demo' }
  ];

  startRoutes = [
    { name: 'Installation', route: 'getting-started' },
    { name: 'Angular CLI', route: 'cli-guide' }
  ];

  constructor(
    private _router: Router,
    private _ngZone: NgZone) {
    this._mediaMatcher.addListener(mql => this._ngZone.run(() => this._mediaMatcher = mql));
  }

  isScreenSmall(): boolean {
    return this._mediaMatcher.matches;
  }

  ngOnInit(): void {
    this._router.events
      .pipe(takeUntil(this._destroy),
        filter(event => event instanceof NavigationEnd))
      .subscribe(_ => {
        if (this._router.url.includes('/app-bar-demo')) {
          this.demoAppBarControls.nativeElement.style.display = 'block';
        } else {
          this.demoAppBarControls.nativeElement.style.display = 'none';
          this.appBar.fixed = true; // reset to fixed after navigation off app-bar demo
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}

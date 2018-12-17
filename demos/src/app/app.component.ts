import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: '<app-layout></app-layout>'
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) { }

  ngOnInit() {
    if (environment.production) {
      this._router.events.subscribe(event => {
        if (this._router.url !== '/') {
          if (event instanceof NavigationEnd) {
            (<any>window).ga('set', 'page', event.urlAfterRedirects);
            (<any>window).ga('send', 'pageview');
          }
        }
      });
    }
  }
}

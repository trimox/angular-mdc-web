import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template:
  `
  <div mdc-typography>
    <navbar></navbar>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) { }
  ngOnInit() {
    this._router.events.subscribe(event => {
      if (this._router.url !== '/') {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      }
    });
  }
}

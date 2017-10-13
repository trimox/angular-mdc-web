import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<app-toolbar></app-toolbar>'
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.events.subscribe(event => {
      if (this._router.url !== '/' && !this._router.url.includes('/tab-demo')) {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      }
    });
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<app-layout></app-layout>',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sass/app.scss']
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.events.subscribe(event => {
      if (this._router.url !== '/') {
        if (event instanceof NavigationEnd) {
          // (<any>window).ga('set', 'page', event.urlAfterRedirects);
          // (<any>window).ga('send', 'pageview');
          window.scrollTo(0, 0);
        }
      }
    });
  }
}

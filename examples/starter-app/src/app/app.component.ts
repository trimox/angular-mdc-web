import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  destinations = [
    {label: 'Inbox', icon: 'inbox', activated: true},
    {label: 'Star', icon: 'star', activated: false},
    {label: 'Sent Mail', icon: 'send', activated: false},
    {label: 'Drafts', icon: 'drafts', activated: false}
  ];

  tabs = [
    {label: 'Flights', icon: 'airplanemode_active'},
    {label: 'Hotel', icon: 'hotel'},
    {label: 'Favorites', icon: 'favorite'}
  ];

  constructor(
    private _router: Router) {}

  onDrawerSelect(route?: string) {
    if (route) {
      this._router.navigate([route]);
    }
  }
}

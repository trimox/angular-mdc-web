import {
  Component
} from '@angular/core';

@Component({
  selector: 'mdc-menu-divider',
  template: '<li class="mdc-list-divider" role="seperator"><ng-content></ng-content></li>'
})
export class MenuDividerComponent { }
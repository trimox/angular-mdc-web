import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  buttonDemo() {
    this.router.navigate(['button-demo']);
  }
  checkboxDemo() {
    this.router.navigate(['checkbox-demo']);
  }
  fabDemo() {
    this.router.navigate(['fab-demo']);
  }
  switchDemo() {
    this.router.navigate(['switch-demo']);
  }
  snackDemo() {
    this.router.navigate(['snackbar-demo']);
  }
  menuDemo() {
    this.router.navigate(['menu-demo']);
  }
  textfieldDemo() {
    this.router.navigate(['textfield-demo']);
  }
  toolbarDemo() {
    this.router.navigate(['toolbar-demo']);
  }
}

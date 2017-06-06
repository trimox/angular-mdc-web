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

  viewComponent(value: string) {
    this.router.navigate([value]);
  }
}

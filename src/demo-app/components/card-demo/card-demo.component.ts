import {
  Component,
} from '@angular/core';

@Component({
  selector: 'card-demo',
  templateUrl: './card-demo.component.html'
})
export class CardDemoComponent {
  isLargeTitle: boolean = true;
  isThemeDark: boolean;
}

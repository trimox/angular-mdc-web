import {
  Component
} from '@angular/core';

@Component({
  selector: 'checkbox-demo',
  templateUrl: './checkbox-demo.html'
})
export class CheckboxDemo {
  isChecked: boolean = true;
  isIndeterminate: boolean;

  setIndeterminate() {
    this.isIndeterminate = !this.isIndeterminate;
  }
}

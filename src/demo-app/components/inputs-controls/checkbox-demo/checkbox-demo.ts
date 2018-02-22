import { Component } from '@angular/core';

@Component({
  selector: 'checkbox-demo',
  templateUrl: './checkbox-demo.html'
})
export class CheckboxDemo {
  onChange(event: any) {
    console.log(event);
  }

  onIndeterminateChange(event: { indeterminate: boolean, source: any }) {
    console.log(event);
  }
}

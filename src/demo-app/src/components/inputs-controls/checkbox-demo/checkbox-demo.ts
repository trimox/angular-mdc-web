import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'checkbox-demo',
  templateUrl: './checkbox-demo.html'
})
export class CheckboxDemo {
  isChecked: boolean = true;
  isIndeterminate: boolean = false;
  isAlignEnd: boolean = false;
  isDisabled: boolean = false;
  isRippleDisabled: boolean = false;

  @ViewChild('checkbox') checkbox: any;

  setIndeterminate() {
    this.checkbox.setIndeterminate(true);
  }

  toggleRTL() {
    this.isAlignEnd = !this.isAlignEnd;
  }

  handleChange(event: any) {
    console.log(event);
  }

  handleIndeterminateChange(event: { indeterminate: boolean, source: any }) {
    console.log(event);
    this.isIndeterminate = event.indeterminate;
  }

  toggleChecked() {
    this.checkbox.toggle();
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  toggleRippleDisabled() {
    this.isRippleDisabled = !this.isRippleDisabled;
  }
}

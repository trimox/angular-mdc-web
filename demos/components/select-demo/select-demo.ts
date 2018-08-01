import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'select-demo',
  templateUrl: './select-demo.html'
})
export class SelectDemo {
  // foodControl = new FormControl('fruit-3');
  foodControl = new FormControl();
  currentFoodObject: any;

  foods = [
    { value: null, viewValue: '', disabled: false },
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos is disabled', disabled: true },
    { value: 'fruit-3', viewValue: 'Fruit' },
  ];

  compareFn(f1: { value: any }, f2: { value: any }): boolean {
    return f1 && f2 && f1.value === f2.value;
  }

  constructor() {
    // this.foodControl.setValue('fruit-3');
  }

  onChange(event: { index: number, value: any }) {
    console.log(`onChange: ${event.index}`);
  }

  onSelectionChange(event: { index: any, value: any }) {
    console.log(`onSelectionChange: ${event.index} ${event.value}`);
  }
  onSelectionChangeTest(event: { index: any, value: any }) {
    console.log(this.currentFoodObject)
    console.log(`onSelectionChange: ${event.index} ${event.value}`);
  }
}

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'select-demo',
  templateUrl: './select-demo.html'
})
export class SelectDemo {
  selectedValue: string;

  // foodControl = new FormControl('fruit-3');
  foodControl = new FormControl();

  foods = [
    { value: '', description: '', disabled: false },
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos is disabled', disabled: true },
    { value: 'fruit-3', description: 'Fruit' },
  ];

  constructor() {
    // this.selectedValue = 'pizza-1';
    // this.foodControl.setValue('fruit-3');
  }

  onChange(event: { index: number, value: any }) {
    console.log(`onChange: ${event.index}`);
  }

  onSelectionChange(event: { index: any, value: any }) {
    console.log(`onSelectionChange: ${event.index}`);
  }
}

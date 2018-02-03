import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'select-demo',
  templateUrl: './select-demo.html'
})
export class SelectDemo {
  selectedValue: string;
  changeIndex: number;
  changeValue: any;
  selectionChangeValue: any;

  // foodControl = new FormControl('pizza-1');
  foodControl = new FormControl();

  foods = [
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos is disabled', disabled: true },
    { value: 'fruit-3', description: 'Fruit' },
  ];

  constructor() {
    // this.foodControl.setValue('steak-0');
    this.selectedValue = 'pizza-1';
  }

  clearSelection() {
    this.selectedValue = null;
  }

  setSelection() {
    this.selectedValue = 'fruit-3';
  }

  onChange(event: { index: number, value: any }) {
    console.log(event);
    this.changeIndex = event.index;
    this.changeValue = event.value;
  }

  onSelectionChange(event: {source: any, value: any}) {
    console.log(event);
    this.selectionChangeValue = event.value
  }
}

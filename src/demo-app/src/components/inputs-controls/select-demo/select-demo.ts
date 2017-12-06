import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MdcSelect } from '@angular-mdc/web';

@Component({
  selector: 'select-demo',
  templateUrl: './select-demo.html'
})
export class SelectDemo implements AfterViewInit {
  isDisabled: boolean = false;
  selectedValue: string;
  isDarkTheme: boolean = false;
  eventIndex: number;
  eventValue: any;

  // foodControl = new FormControl('pizza-1');
  foodControl = new FormControl();

  foods = [
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos is disabled', disabled: true },
    { value: 'fruit-3', description: 'Fruit' },
  ];

  @ViewChild('select') select: MdcSelect;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => this.foodControl.setValue('pizza-1'), 10);
  }

  clearSelection() {
    // this.select.clearSelection();
    this.selectedValue = null;
  }

  setSelection() {
    this.selectedValue = 'fruit-3';
  }

  handleChange(event: { index: number, value: any }) {
    this.eventIndex = event.index;
    this.eventValue = event.value;
  }
}

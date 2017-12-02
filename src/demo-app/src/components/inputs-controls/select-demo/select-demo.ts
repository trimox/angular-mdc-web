import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'select-demo',
  templateUrl: './select-demo.html'
})
export class SelectDemo implements AfterViewInit, OnInit {
  isDisabled: boolean = false;
  selectedValue: string;
  closeOnScroll: boolean = true;
  isDarkTheme: boolean = false;
  eventIndex: number;
  eventValue: any;

  animalControl = new FormControl('', [Validators.required]);

  foods = [
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos is disabled', disabled: true },
    { value: 'fruit-3', description: 'Fruit' },
  ];

  animals = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];

  @ViewChild('select') select: any;

  constructor() { }

  ngOnInit() {
    this.animalControl.setValue('fruit-3');
  }

  ngAfterViewInit() {
  }

  clearSelection() {
    this.select.clearSelection();
  }

  setSelection() {
    this.selectedValue = 'fruit-3';
  }

  handleChange(event: { index: number, value: any }) {
    this.eventIndex = event.index;
    this.eventValue = event.value;
  }
}

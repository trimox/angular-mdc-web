import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcSelectModule, MdcSelect, MdcSelectItem } from '../../../src/lib/public_api';

describe('MdcSelectModule', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcSelectModule],
      declarations: [
        SimpleTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcSelect;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcSelect));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-select by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-select');
    });

    it('#should set disabled to true', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(testInstance.disabled).toBe(true);
    });

    it('#should generate a unique id for the select if no id is set', () => {
      expect(testInstance.id).toMatch(/mdc-select-\d+/);
    });

    it('#should focus on underlying input element when focus() is called', () => {
      expect(document.activeElement).not.toBe(testNativeElement);

      testInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(testNativeElement);
    });

    it('#should be open', () => {
      testInstance.open();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(true);
    });

    it('#should be closed', () => {
      testInstance.close();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(false);
    });

    it('#should set value to 2', () => {
      testInstance.setSelectedIndex(2);
      testInstance.resize();
      fixture.detectChanges();
      expect(testInstance.getValue()).toBe('tacos-2');
      expect(testInstance.getSelectedIndex()).toBe(2);
    });
  });
});

@Component({
  template:
  `
    <mdc-select label="myPlaceholder" name="food" [disabled]="isDisabled" [closeOnScroll]="closeOnScroll" (change)="handleChange($event)">
      <mdc-select-item *ngFor="let food of foods" [value]="food.value" [disabled]="food.disabled">
        {{food.description}}
      </mdc-select-item>
    </mdc-select>
  `,
})
class SimpleTest {
  myId: string;
  myLabel: string = 'Favorite food';
  isDisabled: boolean = true;
  selectedValue: string;
  closeOnScroll: boolean = true;

  foods = [
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos' },
    { value: 'fruit-3', description: 'Fruit', disabled: true },
  ];

  handleChange(event: { index: number, value: string }) {
    this.selectedValue = event.value;
  }
}

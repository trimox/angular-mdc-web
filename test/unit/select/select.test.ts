import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcSelectModule, MdcSelect, MdcSelectItem } from '../../../src/lib/public_api';

describe('MdcSelectModule', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MdcSelectModule],
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

    it('#steak-1 should be selected', () => {
      testInstance.setSelectionByValue('steak-0');
      fixture.detectChanges();
      expect(testInstance.getSelectedIndex()).toBe(0);
    });

    it('#should be Fruit', () => {
      expect(testInstance.options.toArray()[3].label).toMatch('Fruit');
    });

    it('#should be MyLabel', () => {
      testInstance.setLabel('MyLabel');
      expect(testInstance.label).toMatch('MyLabel');
    });

    it('#should be focused item', () => {
      expect(testInstance.options.first.focus());
    });

    it('#should be deselected item', () => {
      expect(testInstance.options.first.deselect());
    });
  });
});

@Component({
  template:
  `
    <mdc-select [label]="labelText" name="food" [(ngModel)]="selectedValue" [disabled]="isDisabled" [closeOnScroll]="closeOnScroll" (change)="handleChange($event)">
      <mdc-select-item *ngFor="let food of foods" [value]="food.value" [disabled]="food.disabled">
        {{food.description}}
      </mdc-select-item>
    </mdc-select>
  `,
})
class SimpleTest {
  labelText: string = 'Favorite food';
  isDisabled: boolean = true;
  selectedValue: string = 'pizza-1';
  closeOnScroll: boolean = true;

  foods = [
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos' },
    { value: 'fruit-3', description: 'Fruit', disabled: true },
  ];

  handleChange(event: { index: number, value: string }) { }
}

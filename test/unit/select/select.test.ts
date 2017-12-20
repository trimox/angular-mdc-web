import { Component, DebugElement } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { async, fakeAsync, flush, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcSelectModule, MdcSelect, MdcSelectItem } from '@angular-mdc/web';

describe('MdcSelectModule', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MdcSelectModule],
      declarations: [
        SimpleTest,
        SelectFormControl,
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

    it('#should be closed', () => {
      testInstance.open(1);
      testInstance.close();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(false);
    });

    it('#should be Fruit', () => {
      expect(testInstance.options.toArray()[3].label).toMatch('Fruit');
    });

    it('#should have `Please select` as placeholder text', () => {
      testInstance.setPlaceholder('Please select');
      expect(testInstance.placeholder).toMatch('Please select');
    });

    it('#should be focused item', () => {
      expect(testInstance.options.first.focus());
    });

    it('#should be deselected item', () => {
      expect(testInstance.options.first.deselect());
    });

    it('#should be call `resize` on item removal', () => {
      testComponent.foods.splice(2, 1);
      fixture.detectChanges();
      expect(testInstance.options.toArray().length).toBe(3);
    });

    it('#should have no selected options', () => {
      testComponent.selectedValue = null;
      fixture.detectChanges();
      expect(testInstance.getSelectedIndex()).toBe(-1);
    });
  });

  describe('form control basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcSelect;
    let testComponent: SelectFormControl;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SelectFormControl);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcSelect));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;

      testNativeElement.click();
      fixture.detectChanges();
    }));

    it('#should set value to tacos-2', fakeAsync(() => {
      testComponent.foodControl.setValue('tacos-2');
      testNativeElement.click();
      fixture.detectChanges();
      flush();

      expect(testInstance.getValue()).toBe('tacos-2');
      testInstance.close();
      testInstance.resize();
    }));
  });
});

@Component({
  template: `
    <mdc-select [placeholder]="myPlaceholder" name="food" [autosize]="true"
     [(ngModel)]="selectedValue" [disabled]="isDisabled" (change)="handleChange($event)">
      <mdc-select-item *ngFor="let food of foods" [value]="food.value" [disabled]="food.disabled">
        {{food.description}}
      </mdc-select-item>
    </mdc-select>
  `,
})
class SimpleTest {
  myPlaceholder: string = 'Favorite food';
  isDisabled: boolean = true;
  selectedValue: string = '';

  foods = [
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos' },
    { value: 'fruit-3', description: 'Fruit', disabled: true },
  ];

  handleChange(event: { index: number, value: string }) { }
}

@Component({
  template: `
  <mdc-select placeholder="Favorite food" [formControl]="foodControl" [autosize]="false">
    <mdc-select-item *ngFor="let food of foods" [value]="food.value" [disabled]="food.disabled">
      {{food.description}}
    </mdc-select-item>
  </mdc-select>
  `,
})
class SelectFormControl {
  foodControl = new FormControl();

  foods = [
    { value: 'steak-0', description: 'Steak' },
    { value: 'pizza-1', description: 'Pizza' },
    { value: 'tacos-2', description: 'Tacos' },
    { value: 'fruit-3', description: 'Fruit', disabled: true },
  ];

  handleChange(event: { index: number, value: string }) { }
}

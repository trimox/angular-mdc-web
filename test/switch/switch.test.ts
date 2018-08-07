import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MdcSwitch, MdcSwitchModule } from '@angular-mdc/web';

describe('MdcSwitch', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcSwitchModule, FormsModule, ReactiveFormsModule],
      declarations: [
        SingleSwitch,
        SwitchWithFormDirectives,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let switchDebugElement: DebugElement;
    let switchNativeElement: HTMLElement;
    let switchInstance: MdcSwitch;
    let testComponent: SingleSwitch;
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SingleSwitch);
      fixture.detectChanges();

      switchDebugElement = fixture.debugElement.query(By.directive(MdcSwitch));
      switchNativeElement = switchDebugElement.nativeElement;
      switchInstance = switchDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should change native element checked when check programmatically', () => {
      switchInstance.checked = true;
      fixture.detectChanges();

      expect(switchInstance.inputElement.nativeElement.checked).toBe(true);
    });

    it('#should correctly update the checked property', () => {
      testComponent.slideChecked = true;
      fixture.detectChanges();

      expect(switchInstance.inputElement.nativeElement.checked).toBeTruthy();
    });

    it('#should not update the checked value', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      switchInstance.setChecked(true);
      fixture.detectChanges();

      expect(switchInstance.inputElement.nativeElement.checked).toBeFalsy();
    });

    it('#should add and remove disabled state', () => {
      expect(switchInstance.disabled).toBe(false);
      expect(switchInstance.inputElement.nativeElement.tabIndex).toBe(0);
      fixture.detectChanges();

      switchInstance.setDisabled(true);
      fixture.detectChanges();
      expect(switchInstance.inputElement.nativeElement.disabled).toBe(true);
    });

    it('#should not toggle `checked` state upon interation while disabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      switchInstance.inputElement.nativeElement.click();
      expect(switchInstance.checked).toBe(false);
    });

    it('#should preserve the user-provided id', () => {
      expect(switchNativeElement.id).toBe('simple-switch');
      expect(switchInstance.inputElement.nativeElement.id).toBe('simple-switch-input');
    });

    it('#should generate a unique id for the switch input if no id is set', () => {
      testComponent.switchId = null;
      fixture.detectChanges();

      expect(switchInstance.inputId).toMatch(/mdc-switch-\d+/);
      expect(switchInstance.inputElement.nativeElement.id).toBe(switchInstance.inputId);
    });

    it('#should focus on underlying input element when focus() is called', () => {
      expect(document.activeElement).not.toBe(switchInstance.inputElement.nativeElement);

      switchInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(switchInstance.inputElement.nativeElement);
    });

    it('#should forward the tabIndex to the underlying input', () => {
      fixture.detectChanges();

      expect(switchInstance.inputElement.nativeElement.tabIndex).toBe(0);

      testComponent.slideTabindex = 4;
      fixture.detectChanges();

      expect(switchInstance.inputElement.nativeElement.tabIndex).toBe(4);
    });

    describe('with ngModel', () => {
      let switchDebugElement: DebugElement;
      let switchNativeElement: HTMLElement;
      let switchInstance: MdcSwitch;

      beforeEach(() => {
        fixture = TestBed.createComponent(SwitchWithFormDirectives);
        fixture.detectChanges();

        switchDebugElement = fixture.debugElement.query(By.directive(MdcSwitch));
        switchNativeElement = switchDebugElement.nativeElement;
        switchInstance = switchDebugElement.componentInstance;
      });

      it('#should be in pristine, untouched, and valid states initially', fakeAsync(() => {
        flushMicrotasks();

        let switchElement = fixture.debugElement.query(By.directive(MdcSwitch));
        let ngModel = switchElement.injector.get<NgModel>(NgModel);

        expect(ngModel.valid).toBe(true);
        expect(ngModel.pristine).toBe(true);
        expect(ngModel.touched).toBe(false);
      }));

      it('#should toggle checked state on click', () => {
        expect(switchInstance.checked).toBe(false);

        switchInstance.inputElement.nativeElement.click();
        fixture.detectChanges();

        expect(switchInstance.checked).toBe(true);

        switchInstance.inputElement.nativeElement.click();
        fixture.detectChanges();

        expect(switchInstance.checked).toBe(false);
      });
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
    <mdc-switch
      [id]="switchId"
      (click)="onSlideClick($event)"
      [checked]="slideChecked"
      [tabIndex]="slideTabindex"
      [disabled]="isDisabled">
    </mdc-switch>
  `,
})
class SingleSwitch {
  switchId: string | null = 'simple-switch';
  isDisabled: boolean = false;
  slideChecked: boolean = false;
  slideTabindex: number;
  switchValue: string = 'single_switch';

  onSlideClick: (event?: Event) => void = () => { };
}

/** Simple component for testing with ngModel in a form. */
@Component({
  template: `
    <form>
      <mdc-switch name="cb" [(ngModel)]="isGood">Be good</mdc-switch>
    </form>
  `,
})
class SwitchWithFormDirectives {
  isGood: boolean = false;
}

import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick, flush, async} from '@angular/core/testing';
import {FormControl, FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {dispatchFakeEvent, dispatchMouseEvent} from '../testing/dispatch-events';

import {MdcSwitch, MdcSwitchModule} from '@angular-mdc/web';

describe('MdcSwitch', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcSwitchModule, FormsModule, ReactiveFormsModule],
      declarations: [
        SingleSwitch,
        SwitchWithModel,
        SwitchWithFormControl,
        DisabledSwitch
      ]
    });

    TestBed.compileComponents();
  }));

  describe('disabled switch', () => {
    let switchDebugElement: DebugElement;
    let switchNativeElement: HTMLElement;
    let switchInstance: MdcSwitch;
    let testComponent: DisabledSwitch;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(DisabledSwitch);
      fixture.detectChanges();

      switchDebugElement = fixture.debugElement.query(By.directive(MdcSwitch));
      switchNativeElement = switchDebugElement.nativeElement;
      switchInstance = switchDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    }));

    it('#should be disabled', () => {
      fixture.detectChanges();
      expect(switchInstance._inputElement.nativeElement.disabled).toBe(true);
    });
  });

  describe('basic behaviors', () => {
    let switchDebugElement: DebugElement;
    let switchNativeElement: HTMLElement;
    let switchInstance: MdcSwitch;
    let testComponent: SingleSwitch;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SingleSwitch);

      // Enable jasmine spies on event functions, which may trigger at initialization
      // of the mdc-switch component.
      spyOn(fixture.debugElement.componentInstance, 'onChange').and.callThrough();

      fixture.detectChanges();

      switchDebugElement = fixture.debugElement.query(By.directive(MdcSwitch));
      switchNativeElement = switchDebugElement.nativeElement;
      switchInstance = switchDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    }));

    it('#should change native element checked when check programmatically', () => {
      switchInstance.checked = true;
      fixture.detectChanges();

      expect(switchInstance._inputElement.nativeElement.checked).toBe(true);
    });

    it('#should correctly update the checked property', () => {
      testComponent.checked = true;
      fixture.detectChanges();

      expect(switchInstance._inputElement.nativeElement.checked).toBeTruthy();
    });

    it('#should not update the checked value', () => {
      testComponent.disabled = true;
      fixture.detectChanges();

      dispatchMouseEvent(switchDebugElement.nativeElement, 'click');
      testComponent.checked = true;
      fixture.detectChanges();

      expect(switchInstance._inputElement.nativeElement.checked).toBeFalsy();
    });

    it('#should not update the checked value on mouse event', () => {
      testComponent.disabled = true;
      fixture.detectChanges();

      dispatchMouseEvent(switchDebugElement.nativeElement, 'mousedown');
      fixture.detectChanges();

      expect(switchInstance._inputElement.nativeElement.checked).toBeFalsy();
    });

    it('#should be in disabled state', () => {
      switchInstance.disabled = true;
      expect(switchInstance._inputElement.nativeElement.tabIndex).toBe(0);
      fixture.detectChanges();

      expect(switchInstance._inputElement.nativeElement.disabled).toBe(true);
    });

    it('#should not toggle `checked` state upon interation while disabled', () => {
      testComponent.disabled = true;
      fixture.detectChanges();

      switchInstance._inputElement.nativeElement.click();
      expect(switchInstance.checked).toBe(false);
    });

    it('#should be required', () => {
      testComponent.required = true;
      fixture.detectChanges();

      expect(switchInstance.required).toBe(true);
    });

    it('#should preserve the user-provided id', () => {
      expect(switchNativeElement.id).toBe('simple-switch');
      expect(switchInstance._inputElement.nativeElement.id).toBe('simple-switch-input');
    });

    it('#should generate a unique id for the switch input if no id is set', () => {
      testComponent.switchId = null;
      fixture.detectChanges();

      expect(switchInstance.inputId).toMatch(/mdc-switch-\d+/);
      expect(switchInstance._inputElement.nativeElement.id).toBe(switchInstance.inputId);
    });

    it('#should focus on underlying input element when focus() is called', () => {
      expect(document.activeElement).not.toBe(switchInstance._inputElement.nativeElement);

      switchInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(switchInstance._inputElement.nativeElement);
    });

    it('#should forward the tabIndex to the underlying input', () => {
      fixture.detectChanges();

      expect(switchInstance._inputElement.nativeElement.tabIndex).toBe(0);

      testComponent.slideTabindex = 4;
      fixture.detectChanges();

      expect(switchInstance._inputElement.nativeElement.tabIndex).toBe(4);
    });
  });
});

describe('MdcSwitch with forms', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcSwitchModule, FormsModule, ReactiveFormsModule],
      declarations: [
        SwitchWithModel,
        SwitchWithFormControl
      ]
    });

    TestBed.compileComponents();
  }));

  describe('with ngModel', () => {
    let fixture: ComponentFixture<SwitchWithModel>;

    let testComponent: SwitchWithModel;
    let switchInstance: MdcSwitch;
    let switchModel: NgModel;
    let switchElement: HTMLElement;
    let inputElement: HTMLInputElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SwitchWithModel);
      spyOn(fixture.debugElement.componentInstance, 'onChange').and.callThrough();
      fixture.detectChanges();

      const switchDebug = fixture.debugElement.query(By.directive(MdcSwitch));

      testComponent = fixture.debugElement.componentInstance;
      switchInstance = switchDebug.componentInstance;
      switchElement = switchDebug.nativeElement;
      switchModel = switchDebug.injector.get<NgModel>(NgModel);
      inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    }));

    it('should be initially set to ng-pristine', () => {
      expect(switchElement.classList).toContain('ng-pristine');
      expect(switchElement.classList).not.toContain('ng-dirty');
    });

    it('should update the model programmatically', fakeAsync(() => {
      expect(switchElement.classList).not.toContain('mdc-switch--checked');

      testComponent.modelValue = true;
      fixture.detectChanges();

      // Flush the microtasks because the forms module updates the model state asynchronously.
      flushMicrotasks();

      fixture.detectChanges();
      expect(switchElement.classList).toContain('mdc-switch--checked');
    }));

    it('should have the correct control state initially and after interaction', fakeAsync(() => {
      // The control should start off valid, pristine, and untouched.
      expect(switchModel.valid).toBe(true);
      expect(switchModel.pristine).toBe(true);
      expect(switchModel.touched).toBe(false);

      // After changing the value from the view, the control should
      // become dirty (not pristine), but remain untouched if focus is still there.
      switchInstance.checked = true;

      // Dispatch a change event on the input element to fake a user interaction that triggered
      // the state change.
      dispatchFakeEvent(inputElement, 'change');

      expect(switchModel.valid).toBe(true);
      expect(switchModel.pristine).toBe(false);
      expect(switchModel.touched).toBe(false);

      // Once the input element loses focus, the control should remain dirty but should
      // also turn touched.
      dispatchFakeEvent(inputElement, 'blur');
      fixture.detectChanges();
      flushMicrotasks();

      expect(switchModel.valid).toBe(true);
      expect(switchModel.pristine).toBe(false);
      expect(switchModel.touched).toBe(true);
    }));

    it('should not throw an error when disabling while focused', fakeAsync(() => {
      expect(() => {
        // Focus the input element because after disabling, the `blur` event should automatically
        // fire and not result in a changed after checked exception. Related: #12323
        inputElement.focus();

        // Flush the two nested timeouts from the FocusMonitor that are being created on `focus`.
        flush();

        switchInstance.disabled = true;
        fixture.detectChanges();
        flushMicrotasks();
      }).not.toThrow();
    }));

    it('should support subscription on the change observable', fakeAsync(() => {
      const spy = jasmine.createSpy('change spy');
      const subscription = switchInstance.change.subscribe(spy);

      switchInstance._inputElement.nativeElement.click();
      fixture.detectChanges();
      tick();

      expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({checked: true}));
      subscription.unsubscribe();
    }));

    it('should not set the control to touched when changing the state programmatically',
      fakeAsync(() => {

        // The control should start off with being untouched.
        expect(switchModel.touched).toBe(false);

        switchInstance.checked = true;
        fixture.detectChanges();

        expect(switchModel.touched).toBe(false);
        expect(switchElement.classList).toContain('mdc-switch--checked');

        // Once the input element loses focus, the control should remain dirty but should
        // also turn touched.
        dispatchFakeEvent(inputElement, 'blur');
        fixture.detectChanges();
        flushMicrotasks();

        expect(switchModel.touched).toBe(true);
        expect(switchElement.classList).toContain('mdc-switch--checked');
      }));

    it('should set the model value when toggling via the `toggle` method', fakeAsync(() => {
      expect(testComponent.modelValue).toBe(false);

      fixture.debugElement.query(By.directive(MdcSwitch)).componentInstance.toggle();
      fixture.detectChanges();
      flushMicrotasks();

      fixture.detectChanges();
      expect(testComponent.modelValue).toBe(true);
    }));

    it('#should toggle checked state on click', () => {
      switchInstance._inputElement.nativeElement.click();
      fixture.detectChanges();
      expect(switchInstance.checked).toBe(true);

      switchInstance._inputElement.nativeElement.click();
      fixture.detectChanges();
      expect(switchInstance.checked).toBe(false);
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
  <mdc-switch
    [id]="switchId"
    (click)="onChange($event)"
    [checked]="checked"
    [required]="required"
    [tabIndex]="slideTabindex"
    [disabled]="disabled">
  </mdc-switch>
  `,
})
class SingleSwitch {
  switchId: string | null = 'simple-switch';
  disabled: boolean;
  checked: boolean;
  required: boolean;
  slideTabindex: number;
  switchValue: string = 'single_switch';

  onChange: () => void = () => {};
}

@Component({
  template: `
  <mdc-form-field>
    <mdc-switch [formControl]="formControl"></mdc-switch>
    <label>off/on</label>
  </mdc-form-field>
  `,
})
class SwitchWithFormControl {
  formControl = new FormControl();
}

@Component({
  template: `<mdc-switch disabled></mdc-switch>`,
})
class DisabledSwitch {}

/** Simple component for testing with ngModel in a form. */
@Component({
  template: `<mdc-switch name="cb" [(ngModel)]="modelValue" (change)="onChange()">Be good</mdc-switch>`,
})
class SwitchWithModel {
  modelValue: boolean = false;
  onChange: () => void = () => {};
}

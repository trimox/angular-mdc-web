import {Component, DebugElement, ViewChild, Provider} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators
} from '@angular/forms';
import {async, fakeAsync, ComponentFixture, TestBed, flush} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DOWN_ARROW} from '@angular/cdk/keycodes';
import {Platform} from '@angular/cdk/platform';

import {dispatchKeyboardEvent, dispatchMouseEvent} from '@angular-mdc/web/testing';

import {
  MdcSelectModule,
  MdcSelect,
  MDC_SELECT_DEFAULT_OPTIONS
} from './index';

function configureMdcTestingModule(declarations: any[], providers: Provider[] = []) {
  let platform: {isBrowser: boolean};

  // Set the default Platform override that can be updated before component creation.
  platform = {isBrowser: true};

  TestBed.configureTestingModule({
    imports: [
      MdcSelectModule,
      ReactiveFormsModule,
      FormsModule,
    ],
    declarations: declarations,
    providers: [
      {provide: Platform, useFactory: () => platform},
      ...providers
    ],
  }).compileComponents();
}

describe('MdcSelectModule', () => {
  let fixture: ComponentFixture<any>;
  let platform: {isBrowser: boolean};

  beforeEach(async(() => {
    configureMdcTestingModule([
      SimpleTest,
      SelectFormControl,
      EnhancedSelect,
      SelectLazyLoad,
      NgModelSelect
    ]);
  }));

  describe('Tests for SSR', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcSelect;
    let testComponent: SimpleTest;

    beforeEach(() => {
      // Set the default Platform override that can be updated before component creation.
      platform = {isBrowser: false};

      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcSelect));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-select by default', () => {
      expect(testDebugElement.nativeElement.classList)
        .toContain('mdc-select', 'Expected to have mdc-select');
    });

    it('#should handle mouse events', () => {
      testInstance.focus();
      dispatchKeyboardEvent(testInstance.elementRef.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
    });
  });

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
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testInstance.disabled).toBe(true);
    });

    it('#should set required to true', () => {
      testComponent.required = true;
      fixture.detectChanges();
      expect(testInstance.required).toBe(true);
    });

    it('#should set valid to true', () => {
      testComponent.valid = true;
      fixture.detectChanges();
      expect(testInstance.valid).toBe(true);
    });

    it('#should generate a unique id for the select if no id is set', () => {
      expect(testInstance.id).toMatch(/mdc-select-\d+/);
    });

    it('#should have `Please select` as placeholder text', () => {
      testInstance.placeholder = 'Please select';
      fixture.detectChanges();
      expect(testInstance.placeholder).toMatch('Please select');
    });

    it('#should select fruit-3', () => {
      testInstance.setSelectionByValue('fruit-3');
      fixture.detectChanges();
      expect(testInstance.value).toBe('fruit-3');
    });

    it('#should have no selected options', () => {
      testInstance.setSelectionByValue(null);
      fixture.detectChanges();
      expect(testInstance.getSelectedIndex()).toBe(-1);
    });

    it('#should select fruit-3 by index', () => {
      testInstance.setSelectedIndex(3);
      fixture.detectChanges();
      expect(testInstance.value).toBe('fruit-3');
    });

    it('#should handle mouse events', () => {
      testInstance.focus();
      dispatchKeyboardEvent(testInstance.elementRef.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
    });

    it('#should reset', () => {
      testComponent.testValue = '';
      fixture.detectChanges();
      expect(testInstance.getSelectedIndex()).toBe(-1);
    });
  });

  describe('form control basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcSelect;
    let testComponent: SelectFormControl;

    beforeEach(() => {
      fixture = TestBed.createComponent(SelectFormControl);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcSelect));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;

      fixture.detectChanges();
    });

    it('#should apply class outlined', () => {
      testComponent.outlined = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-select--outlined')).toBe(true);
    });

    it('#should remove helper text linkage', () => {
      testInstance.helperText = undefined;
      fixture.detectChanges();
    });

    it('#should set value to tacos-2', () => {
      testComponent.foodControl.setValue('tacos-2');
      expect(testInstance.value).toBe('tacos-2');
    });
  });

  describe('Lazy Loaded', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcSelect;
    let testComponent: SelectLazyLoad;

    beforeEach(() => {
      fixture = TestBed.createComponent(SelectLazyLoad);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcSelect));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should load data', fakeAsync(() => {
      testComponent.loadFoods();
      fixture.detectChanges();
      flush();
      expect(testInstance.value).toBe('pizza-1');
      testComponent.reset();
    }));

    it('#should load data if not outlined', fakeAsync(() => {
      testComponent.outlined = false;
      fixture.detectChanges();

      testComponent.loadFoods();
      fixture.detectChanges();

      expect(testInstance.value).toBe('pizza-1');
      testComponent.reset();
    }));

    it('#should show to screen reader', () => {
      expect(testInstance.helperText!.elementRef.nativeElement.attributes.getNamedItem('aria-hidden')).toBeDefined();
      testInstance.helperText!.showToScreenReader();
      fixture.detectChanges();
      expect(testInstance.helperText!.elementRef.nativeElement.attributes.getNamedItem('aria-hidden')).toBeNull();
    });

    it('#should set validity from helper text', () => {
      testInstance.helperText!.setValidity(true);
      fixture.detectChanges();
      expect(testInstance.helperText!.elementRef.nativeElement.attributes.getNamedItem('role')).toBeDefined();
    });
  });

  describe('Select', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcSelect;
    let testComponent: EnhancedSelect;

    beforeEach(() => {
      fixture = TestBed.createComponent(EnhancedSelect);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcSelect));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;

      fixture.detectChanges();
    });

    it('#should apply class outlined', () => {
      testComponent.outlined = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-select--outlined')).toBe(true);
    });

    it('#should be disabled', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testInstance.disabled).toBe(true);
    }));

    it('#should set required to true and valid to true', () => {
      testInstance.valid = true;
      fixture.detectChanges();
      testComponent.required = false;
      fixture.detectChanges();

      expect(testInstance.required).toBe(false);
    });

    it('#should handle mouse events', fakeAsync(() => {
      testComponent.open = true;
      fixture.detectChanges();
      dispatchMouseEvent(testInstance._menu._list!.getListItemByIndex(1)!.getListItemElement(), 'mousedown');
      fixture.detectChanges();
      flush();
    }));

    it('#should select fruit-3', fakeAsync(() => {
      testInstance.setSelectionByValue('fruit-3', true, 3);
      fixture.detectChanges();
      expect(testInstance.getSelectedIndex()).toBe(3);
      expect(testInstance._hasValue).toBe(true);
    }));

    it('#should select first item', fakeAsync(() => {
      testInstance.setSelectedIndex(1);
      fixture.detectChanges();
      expect(testInstance.getSelectedIndex()).toBe(1);
    }));

    it('#should select no item', fakeAsync(() => {
      testInstance.setSelectedIndex(-1);
      fixture.detectChanges();
      expect(testInstance.getSelectedIndex()).toBe(-1);
    }));

    it('#should open', fakeAsync(() => {
      testComponent.open = true;
      fixture.detectChanges();
      expect(testInstance._menu.open).toBe(true);
    }));
  });
});

it('should be able to provide default values through an injection token', () => {
  configureMdcTestingModule([NgModelSelect], [{
    provide: MDC_SELECT_DEFAULT_OPTIONS,
    useValue: {
      outlined: true
    }
  }]);
  const fixture = TestBed.createComponent(NgModelSelect);
  fixture.detectChanges();
  const select = fixture.componentInstance.select;
  expect(select.outlined).toBe(true);
});

it('should be able to provide default values through an injection token', () => {
  configureMdcTestingModule([NgModelSelect], [{
    provide: MDC_SELECT_DEFAULT_OPTIONS,
    useValue: {
      outlined: null
    }
  }]);
  const fixture = TestBed.createComponent(NgModelSelect);
  fixture.detectChanges();
  const select = fixture.componentInstance.select;
  expect(select.outlined).toBe(false);
});

@Component({
  template: `
    <form #demoSelectForm="ngForm" id="demoSelectForm">
      <mdc-form-field>
        <mdc-select #select placeholder="Favorite food" ngModel #demoSelectModel="ngModel" name="food"
         [disabled]="disabled" [required]="required" [valid]="valid"
         [value]="testValue" [outlined]="outlined" (blur)="handleBlur()"
         (valueChange)="handleValueChange($event)" (selectionChange)="handleSelectedChange($event)">
          <mdc-menu>
            <mdc-list>
              <mdc-list-item *ngFor="let food of foods" [value]="food.value" [disabled]="food.disabled">{{food.description}}</mdc-list-item>
            </mdc-list>
          </mdc-menu>
        </mdc-select>
        <mdc-select-helper-text
          [validation]="true"
          [persistent]="false">Meal selection is required
        </mdc-select-helper-text>
      </mdc-form-field>
    </form>
  `,
})
class SimpleTest {
  myPlaceholder: string = 'Favorite food';
  disabled: boolean = true;
  multiple: boolean;
  required: boolean;
  valid: boolean = false;
  testValue: string;
  outlined: boolean;

  foods = [
    {value: 'steak-0', description: 'Steak'},
    {value: 'pizza-1', description: 'Pizza'},
    {value: 'tacos-2', description: 'Tacos'},
    {value: 'fruit-3', description: 'Fruit', disabled: true},
  ];

  handleValueChange(event: {index: number, value: string}) {}
  handleSelectedChange(event: {index: number, value: string}) {}
  handleBlur: (event?: any) => void = () => {};
}

@Component({
  selector: 'ng-model-select',
  template: `
    <mdc-form-field>
      <mdc-select placeholder="Food" ngModel [disabled]="isDisabled">
      <mdc-menu>
        <mdc-list>
          <mdc-list-item *ngFor="let food of foods" [value]="food.value" [disabled]="food.disabled">{{food.description}}</mdc-list-item>
        </mdc-list>
      </mdc-menu>
      </mdc-select>
    </mdc-form-field>
  `
})
class NgModelSelect {
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  isDisabled: boolean;

  @ViewChild(MdcSelect) select: MdcSelect;
}

@Component({
  template: `
  <mdc-select placeholder="Favorite food" [formControl]="foodControl"
   [outlined]="outlined" (blur)="handleBlur()" [compareWith]="compareFn">
   <mdc-menu>
      <mdc-list>
        <mdc-list-item *ngFor="let food of foods" [value]="food.value" [disabled]="food.disabled">{{food.description}}</mdc-list-item>
      </mdc-list>
    </mdc-menu>
  </mdc-select>
  `,
})
class SelectFormControl {
  foodControl = new FormControl();
  outlined: boolean;

  compareFn(f1: any, f2: any): boolean {
    return f1 && f2 ? f1.id === f2.id : f1 === f2;
  }

  foods = [
    {value: 'steak-0', description: 'Steak'},
    {value: 'pizza-1', description: 'Pizza'},
    {value: 'tacos-2', description: 'Tacos'},
    {value: 'fruit-3', description: 'Fruit', disabled: true},
  ];

  handleBlur: () => void = () => {};
}

@Component({
  template: `
  <form [formGroup]="lazyLoadForm" #formDirectiveLazy="ngForm">
    <mdc-select [outlined]="outlined" formControlName="lazySelect" [helperText]="lazyHelper">
      <mdc-menu>
        <mdc-list>
          <mdc-list-item *ngFor="let food of lazyFoods" [value]="food.value" [disabled]="food.disabled">{{food.viewValue}}</mdc-list-item>
        </mdc-list>
      </mdc-menu>
    </mdc-select>
    <mdc-select-helper-text #lazyHelper validation>
      <span *ngIf="lazyLoadForm.controls['lazySelect'].hasError('required')">Selection
        is required</span>
    </mdc-select-helper-text>
  </form>`,
})
class SelectLazyLoad {
  outlined: boolean = true;
  lazyFoods: any[];

  lazyLoadForm = new FormGroup({
    lazySelect: new FormControl(null, [Validators.required])
  });

  loadFoods(): void {
    this.lazyFoods = [
      {value: '', disabled: false},
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos is disabled', disabled: true},
      {value: 'fruit-3', viewValue: 'Fruit'},
    ];

    // Patch the form
    this.lazyLoadForm.patchValue({
      lazySelect: 'pizza-1'
    });
  }

  reset(): void {
    this.lazyFoods = [];
  }
}

@Component({
  template: `
  <form [formGroup]="foodForm" id="foodForm" #formDirective="ngForm">
    <mdc-select placeholder="Fruit" [helperText]="enhancedHelper" [required]="required"
      [disabled]="disabled" [outlined]="outlined" (blur)="handleBlur($event)">
      <mdc-menu [open]="open">
        <mdc-list>
          <mdc-list-item selected></mdc-list-item>
          <mdc-list-item value="apple">Apple</mdc-list-item>
          <mdc-list-item value="orange">Orange</mdc-list-item>
          <mdc-list-item value="banana">Banana</mdc-list-item>
        </mdc-list>
      </mdc-menu>
    </mdc-select>
    <mdc-select-helper-text #enhancedHelper validation>Field is required</mdc-select-helper-text>
  </form>
`
})
class EnhancedSelect {
  foodForm = new FormGroup({
    favoriteFood: new FormControl(null, [Validators.required])
  });

  outlined: boolean;
  required: boolean = true;
  open: boolean;
  disabled: boolean;

  handleBlur: (event?: any) => void = () => {};

  compareFn(f1: any, f2: any): boolean {
    return f1 && f2 ? f1.id === f2.id : f1 === f2;
  }
}

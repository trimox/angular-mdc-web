import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormControl, FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';
import {Component, DebugElement, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';

import {MdcRadio, MdcRadioChange, MdcRadioGroup, MdcRadioModule} from './index';

describe('MdcRadio', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcRadioModule, FormsModule, ReactiveFormsModule],
      declarations: [
        DisableableRadioButton,
        FocusableRadioButton,
        RadiosInsideRadioGroup,
        RadioGroupWithNgModel,
        RadioGroupWithFormControl,
        StandaloneRadioButtons,
        InterleavedRadioGroup,
        TranscludingWrapper,
        MultipleFormsRadioButtons,
        RadioButtonWithPredefinedTabindex,
      ]
    });

    TestBed.compileComponents();
  }));

  describe('inside of a group', () => {
    let fixture: ComponentFixture<RadiosInsideRadioGroup>;
    let groupDebugElement: DebugElement;
    let radioDebugElements: DebugElement[];
    let radioNativeElements: HTMLElement[];
    let radioInputElements: HTMLInputElement[];
    let groupInstance: MdcRadioGroup;
    let radioInstances: MdcRadio[];
    let testComponent: RadiosInsideRadioGroup;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(RadiosInsideRadioGroup);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;

      groupDebugElement = fixture.debugElement.query(By.directive(MdcRadioGroup));
      groupInstance = groupDebugElement.injector.get<MdcRadioGroup>(MdcRadioGroup);

      radioDebugElements = fixture.debugElement.queryAll(By.directive(MdcRadio));
      radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
      radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

      radioInputElements = radioDebugElements
        .map(debugEl => debugEl.query(By.css('input')).nativeElement);
    }));

    it('should set individual radio names based on the group name', () => {
      expect(groupInstance.name).toBeTruthy();
      for (const radio of radioInstances) {
        expect(radio.name).toBe(groupInstance.name);
      }
    });

    it('should clear the name attribute from the radio group host node', () => {
      expect(groupInstance.name).toBeTruthy();
      expect(groupDebugElement.nativeElement.getAttribute('name')).toBeFalsy();
    });

    it('should disable each individual radio when the group is disabled', () => {
      testComponent.isGroupDisabled = true;
      fixture.detectChanges();

      for (const radio of radioInstances) {
        expect(radio.disabled).toBe(true);
      }
    });

    it('should set required to each radio button when the group is required', () => {
      testComponent.isGroupRequired = true;
      fixture.detectChanges();

      for (const radio of radioInstances) {
        expect(radio.required).toBe(true);
      }
    });

    it('should update the group value when one of the radios changes', () => {
      expect(groupInstance.value).toBeFalsy();

      radioInstances[0].checked = true;
      fixture.detectChanges();

      expect(groupInstance.value).toBe('fire');
      expect(groupInstance.selected).toBe(radioInstances[0]);
    });

    it('should check a radio upon interaction with the underlying native radio button', () => {
      radioInputElements[0].click();
      fixture.detectChanges();

      expect(radioInstances[0].checked).toBe(true);
      expect(groupInstance.value).toBe('fire');
      expect(groupInstance.selected).toBe(radioInstances[0]);
    });

    it('should update the group and radios when updating the group value', () => {
      expect(groupInstance.value).toBeFalsy();

      testComponent.groupValue = 'fire';
      fixture.detectChanges();

      expect(groupInstance.value).toBe('fire');
      expect(groupInstance.selected).toBe(radioInstances[0]);
      expect(radioInstances[0].checked).toBe(true);
      expect(radioInstances[1].checked).toBe(false);

      testComponent.groupValue = 'water';
      fixture.detectChanges();

      expect(groupInstance.value).toBe('water');
      expect(groupInstance.selected).toBe(radioInstances[1]);
      expect(radioInstances[0].checked).toBe(false);
      expect(radioInstances[1].checked).toBe(true);
    });

    it('should deselect all of the checkboxes when the group value is cleared', () => {
      radioInstances[0].checked = true;

      expect(groupInstance.value).toBeTruthy();

      groupInstance.value = null;

      expect(radioInstances.every(radio => !radio.checked)).toBe(true);
    });

    it(`should update the group's selected radio to null when unchecking that radio
        programmatically`, () => {
      const changeSpy = jasmine.createSpy('radio-group change listener');
      groupInstance.change.subscribe(changeSpy);
      radioInstances[0].checked = true;

      fixture.detectChanges();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(groupInstance.value).toBeTruthy();

      radioInstances[0].checked = false;

      fixture.detectChanges();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(groupInstance.value).toBeFalsy();
      expect(radioInstances.every(radio => !radio.checked)).toBe(true);
      expect(groupInstance.selected).toBeNull();
    });

    it('should not fire a change event from the group when a radio checked state changes', () => {
      const changeSpy = jasmine.createSpy('radio-group change listener');
      groupInstance.change.subscribe(changeSpy);
      radioInstances[0].checked = true;

      fixture.detectChanges();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(groupInstance.value).toBeTruthy();
      expect(groupInstance.value).toBe('fire');

      radioInstances[1].checked = true;

      fixture.detectChanges();

      expect(groupInstance.value).toBe('water');
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it(`should update checked status if changed value to radio group's value`, () => {
      const changeSpy = jasmine.createSpy('radio-group change listener');
      groupInstance.change.subscribe(changeSpy);
      groupInstance.value = 'apple';

      expect(changeSpy).not.toHaveBeenCalled();
      expect(groupInstance.value).toBe('apple');
      expect(groupInstance.selected).toBeFalsy('expect group selected to be null');
      expect(radioInstances[0].checked).toBeFalsy('should not select the first button');
      expect(radioInstances[1].checked).toBeFalsy('should not select the second button');
      expect(radioInstances[2].checked).toBeFalsy('should not select the third button');

      radioInstances[0].value = 'apple';

      fixture.detectChanges();

      expect(groupInstance.selected).toBe(
        radioInstances[0], 'expect group selected to be first button');
      expect(radioInstances[0].checked).toBeTruthy('expect group select the first button');
      expect(radioInstances[1].checked).toBeFalsy('should not select the second button');
      expect(radioInstances[2].checked).toBeFalsy('should not select the third button');
    });
  });

  describe('group with ngModel', () => {
    let fixture: ComponentFixture<RadioGroupWithNgModel>;
    let groupDebugElement: DebugElement;
    let radioDebugElements: DebugElement[];
    let innerRadios: DebugElement[];
    let groupInstance: MdcRadioGroup;
    let radioInstances: MdcRadio[];
    let testComponent: RadioGroupWithNgModel;
    let groupNgModel: NgModel;

    beforeEach(() => {
      fixture = TestBed.createComponent(RadioGroupWithNgModel);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;

      groupDebugElement = fixture.debugElement.query(By.directive(MdcRadioGroup));
      groupInstance = groupDebugElement.injector.get<MdcRadioGroup>(MdcRadioGroup);
      groupNgModel = groupDebugElement.injector.get<NgModel>(NgModel);

      radioDebugElements = fixture.debugElement.queryAll(By.directive(MdcRadio));
      radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);
      innerRadios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
    });

    it('should check the corresponding radio button on group value change', () => {
      expect(groupInstance.value).toBeFalsy();
      for (const radio of radioInstances) {
        expect(radio.checked).toBeFalsy();
      }

      groupInstance.value = 'vanilla';
      for (const radio of radioInstances) {
        expect(radio.checked).toBe(groupInstance.value === radio.value);
      }
      expect(groupInstance.selected!.value).toBe(groupInstance.value);
    });

    it('should have the correct control state initially and after interaction', () => {
      // The control should start off valid, pristine, and untouched.
      expect(groupNgModel.valid).toBe(true);
      expect(groupNgModel.pristine).toBe(true);
      expect(groupNgModel.touched).toBe(false);

      // After changing the value programmatically, the control should stay pristine
      // but remain untouched.
      radioInstances[1].checked = true;
      fixture.detectChanges();

      expect(groupNgModel.valid).toBe(true);
      expect(groupNgModel.pristine).toBe(true);
      expect(groupNgModel.touched).toBe(false);
    });

    it('should write to the radio button based on ngModel', fakeAsync(() => {
      testComponent.modelValue = 'chocolate';

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(innerRadios[1].nativeElement.checked).toBe(true);
      expect(radioInstances[1].checked).toBe(true);
    }));
  });

  describe('group with FormControl', () => {
    let fixture: ComponentFixture<RadioGroupWithFormControl>;
    let groupDebugElement: DebugElement;
    let groupInstance: MdcRadioGroup;
    let testComponent: RadioGroupWithFormControl;

    beforeEach(() => {
      fixture = TestBed.createComponent(RadioGroupWithFormControl);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      groupDebugElement = fixture.debugElement.query(By.directive(MdcRadioGroup));
      groupInstance = groupDebugElement.injector.get<MdcRadioGroup>(MdcRadioGroup);
    });

    it('should toggle the disabled state', () => {
      expect(groupInstance.disabled).toBeFalsy();

      testComponent.formControl.disable();
      fixture.detectChanges();

      expect(groupInstance.disabled).toBeTruthy();

      testComponent.formControl.enable();
      fixture.detectChanges();

      expect(groupInstance.disabled).toBeFalsy();
    });
  });

  describe('disableable', () => {
    let fixture: ComponentFixture<DisableableRadioButton>;
    let radioInstance: MdcRadio;
    let radioNativeElement: HTMLInputElement;
    let testComponent: DisableableRadioButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(DisableableRadioButton);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      const radioDebugElement = fixture.debugElement.query(By.directive(MdcRadio));
      radioInstance = radioDebugElement.injector.get<MdcRadio>(MdcRadio);
      radioNativeElement = radioDebugElement.nativeElement.querySelector('input');
    });

    it('should toggle the disabled state', () => {
      expect(radioInstance.disabled).toBeFalsy();
      expect(radioNativeElement.disabled).toBeFalsy();

      testComponent.disabled = true;
      fixture.detectChanges();
      expect(radioInstance.disabled).toBeTruthy();
      expect(radioNativeElement.disabled).toBeTruthy();

      testComponent.disabled = false;
      fixture.detectChanges();
      expect(radioInstance.disabled).toBeFalsy();
      expect(radioNativeElement.disabled).toBeFalsy();
    });
  });

  describe('as standalone', () => {
    let fixture: ComponentFixture<StandaloneRadioButtons>;
    let radioDebugElements: DebugElement[];
    let seasonRadioInstances: MdcRadio[];
    let weatherRadioInstances: MdcRadio[];
    let fruitRadioInstances: MdcRadio[];
    let fruitRadioNativeInputs: HTMLElement[];
    let testComponent: StandaloneRadioButtons;

    beforeEach(() => {
      fixture = TestBed.createComponent(StandaloneRadioButtons);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;

      radioDebugElements = fixture.debugElement.queryAll(By.directive(MdcRadio));
      seasonRadioInstances = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name === 'season')
        .map(debugEl => debugEl.componentInstance);
      weatherRadioInstances = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name === 'weather')
        .map(debugEl => debugEl.componentInstance);
      fruitRadioInstances = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name === 'fruit')
        .map(debugEl => debugEl.componentInstance);

      const fruitRadioNativeElements = radioDebugElements
        .filter(debugEl => debugEl.componentInstance.name === 'fruit')
        .map(debugEl => debugEl.nativeElement);

      fruitRadioNativeInputs = [];
      for (const element of fruitRadioNativeElements) {
        fruitRadioNativeInputs.push(<HTMLElement>element.querySelector('input'));
      }
    });

    it('should uniquely select radios by a name', () => {
      seasonRadioInstances[0].checked = true;
      weatherRadioInstances[1].checked = true;

      fixture.detectChanges();
      expect(seasonRadioInstances[0].checked).toBe(true);
      expect(seasonRadioInstances[1].checked).toBe(false);
      expect(seasonRadioInstances[2].checked).toBe(false);
      expect(weatherRadioInstances[0].checked).toBe(false);
      expect(weatherRadioInstances[1].checked).toBe(true);
      expect(weatherRadioInstances[2].checked).toBe(false);

      seasonRadioInstances[1].checked = true;
      fixture.detectChanges();
      expect(seasonRadioInstances[0].checked).toBe(false);
      expect(seasonRadioInstances[1].checked).toBe(true);
      expect(seasonRadioInstances[2].checked).toBe(false);
      expect(weatherRadioInstances[0].checked).toBe(false);
      expect(weatherRadioInstances[1].checked).toBe(true);
      expect(weatherRadioInstances[2].checked).toBe(false);

      weatherRadioInstances[2].checked = true;
      expect(seasonRadioInstances[0].checked).toBe(false);
      expect(seasonRadioInstances[1].checked).toBe(true);
      expect(seasonRadioInstances[2].checked).toBe(false);
      expect(weatherRadioInstances[0].checked).toBe(false);
      expect(weatherRadioInstances[1].checked).toBe(false);
      expect(weatherRadioInstances[2].checked).toBe(true);
    });

    it('should add required attribute to the underlying input element if defined', () => {
      const radioInstance = seasonRadioInstances[0];
      radioInstance.required = true;
      fixture.detectChanges();

      expect(radioInstance.required).toBe(true);
    });

    it('should add aria-label attribute to the underlying input element if defined', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Banana');
    });

    it('should not add aria-label attribute if not defined', () => {
      expect(fruitRadioNativeInputs[1].hasAttribute('aria-label')).toBeFalsy();
    });

    it('should change aria-label attribute if property is changed at runtime', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Banana');

      testComponent.ariaLabel = 'Pineapple';
      fixture.detectChanges();

      expect(fruitRadioNativeInputs[0].getAttribute('aria-label')).toBe('Pineapple');
    });

    it('should toggle', () => {
      testComponent.value = 'Pineapple';
      fixture.detectChanges();
      expect(fruitRadioInstances[0].value).toBe('Pineapple');
    });

    it('should add aria-labelledby attribute to the underlying input element if defined', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('xyz');
    });

    it('should not add aria-labelledby attribute if not defined', () => {
      expect(fruitRadioNativeInputs[1].hasAttribute('aria-labelledby')).toBeFalsy();
    });

    it('should change aria-labelledby attribute if property is changed at runtime', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('xyz');

      testComponent.ariaLabelledby = 'uvw';
      fixture.detectChanges();

      expect(fruitRadioNativeInputs[0].getAttribute('aria-labelledby')).toBe('uvw');
    });

    it('should add aria-describedby attribute to the underlying input element if defined', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-describedby')).toBe('abc');
    });

    it('should not add aria-describedby attribute if not defined', () => {
      expect(fruitRadioNativeInputs[1].hasAttribute('aria-describedby')).toBeFalsy();
    });

    it('should change aria-describedby attribute if property is changed at runtime', () => {
      expect(fruitRadioNativeInputs[0].getAttribute('aria-describedby')).toBe('abc');

      testComponent.ariaDescribedby = 'uvw';
      fixture.detectChanges();

      expect(fruitRadioNativeInputs[0].getAttribute('aria-describedby')).toBe('uvw');
    });

    it('should focus on underlying input element when focus() is called', () => {
      for (let i = 0; i < fruitRadioInstances.length; i++) {
        expect(document.activeElement).not.toBe(fruitRadioNativeInputs[i]);
        fruitRadioInstances[i].focus();
        fixture.detectChanges();

        expect(document.activeElement).toBe(fruitRadioNativeInputs[i]);
      }
    });

    it('should not add the "name" attribute if it is not passed in', () => {
      const radio = fixture.debugElement.nativeElement.querySelector('#nameless input');
      expect(radio.hasAttribute('name')).toBe(false);
    });

    it('should clear the name attribute from the radio host node', () => {
      expect(radioDebugElements.every(el => !el.nativeElement.getAttribute('name'))).toBe(true);
    });
  });

  describe('with tabindex', () => {
    let fixture: ComponentFixture<FocusableRadioButton>;

    beforeEach(() => {
      fixture = TestBed.createComponent(FocusableRadioButton);
      fixture.detectChanges();
    });

    it('should allow specifying an explicit tabindex for a single radio-button', () => {
      const radioButtonInput = fixture.debugElement
        .query(By.css('.mdc-radio input')).nativeElement as HTMLInputElement;

      expect(radioButtonInput.tabIndex)
        .toBe(0, 'Expected the tabindex to be set to "0" by default.');

      fixture.componentInstance.tabIndex = 4;
      fixture.detectChanges();

      expect(radioButtonInput.tabIndex)
        .toBe(4, 'Expected the tabindex to be set to "4".');
    });

    it('should remove the tabindex from the host element', () => {
      const predefinedFixture = TestBed.createComponent(RadioButtonWithPredefinedTabindex);
      predefinedFixture.detectChanges();

      const radioButtonEl =
        predefinedFixture.debugElement.query(By.css('.mdc-radio')).nativeElement;

      expect(radioButtonEl.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('group interspersed with other tags', () => {
    let fixture: ComponentFixture<InterleavedRadioGroup>;
    let groupDebugElement: DebugElement;
    let groupInstance: MdcRadioGroup;
    let radioDebugElements: DebugElement[];
    let radioInstances: MdcRadio[];

    beforeEach(async(() => {
      fixture = TestBed.createComponent(InterleavedRadioGroup);
      fixture.detectChanges();

      groupDebugElement = fixture.debugElement.query(By.directive(MdcRadioGroup));
      groupInstance = groupDebugElement.injector.get<MdcRadioGroup>(MdcRadioGroup);
      radioDebugElements = fixture.debugElement.queryAll(By.directive(MdcRadio));
      radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);
    }));

    it('should initialize selection of radios based on model value', () => {
      expect(groupInstance.selected).toBe(radioInstances[2]);
    });
  });

  describe('groups inside different forms', () => {
    let fixture: ComponentFixture<MultipleFormsRadioButtons>;
    let testComponent: MultipleFormsRadioButtons;
    let radioDebugElements: DebugElement[];
    let radioInstances: MdcRadio[];

    beforeEach(() => {
      fixture = TestBed.createComponent(MultipleFormsRadioButtons);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;

      radioDebugElements = fixture.debugElement.queryAll(By.directive(MdcRadio));
      radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);
    });

    it('should select different values even if they have the same name', () => {
      radioInstances[2].checked = true;
      radioInstances[3].checked = true;
      radioInstances[8].checked = true;
      fixture.detectChanges();

      expect(radioInstances[0].checked).toBeFalsy();
      expect(radioInstances[1].checked).toBeFalsy();
      expect(radioInstances[2].checked).toBeTruthy();

      expect(radioInstances[3].checked).toBeTruthy();
      expect(radioInstances[4].checked).toBeFalsy();
      expect(radioInstances[5].checked).toBeFalsy();

      expect(radioInstances[6].checked).toBeFalsy();
      expect(radioInstances[7].checked).toBeFalsy();
      expect(radioInstances[8].checked).toBeTruthy();

      radioInstances[1].checked = true;
      radioInstances[5].checked = true;
      radioInstances[6].checked = true;
      fixture.detectChanges();

      expect(radioInstances[0].checked).toBeFalsy();
      expect(radioInstances[1].checked).toBeTruthy();
      expect(radioInstances[2].checked).toBeFalsy();

      expect(radioInstances[3].checked).toBeFalsy();
      expect(radioInstances[4].checked).toBeFalsy();
      expect(radioInstances[5].checked).toBeTruthy();

      expect(radioInstances[6].checked).toBeTruthy();
      expect(radioInstances[7].checked).toBeFalsy();
      expect(radioInstances[8].checked).toBeFalsy();
    });
  });
});

@Component({
  template: `
  <mdc-radio-group [disabled]="isGroupDisabled"
                  [required]="isGroupRequired"
                  [value]="groupValue"
                  name="test-name">
    <mdc-form-field>
      <mdc-radio value="fire" [disabled]="isFirstDisabled"></mdc-radio>
      <label>Charmander</label>
    </mdc-form-field>
    <mdc-form-field>
      <mdc-radio value="water"></mdc-radio>
      <label>Squirtle</label>
    </mdc-form-field>
    <mdc-form-field>
      <mdc-radio value="leaf"></mdc-radio>
      <label>Bulbasaur</label>
    </mdc-form-field>
  </mdc-radio-group>
  `
})
class RadiosInsideRadioGroup {
  isFirstDisabled: boolean = false;
  isGroupDisabled: boolean = false;
  isGroupRequired: boolean = false;
  groupValue: string | null = null;
}

@Component({
  template: `
    <mdc-radio name="season" value="spring">Spring</mdc-radio>
    <mdc-radio name="season" value="summer">Summer</mdc-radio>
    <mdc-radio name="season" value="autum">Autumn</mdc-radio>

    <mdc-radio name="weather" value="warm">Spring</mdc-radio>
    <mdc-radio name="weather" value="hot">Summer</mdc-radio>
    <mdc-radio name="weather" value="cool">Autumn</mdc-radio>

    <span id="xyz">Baby Banana</span>
    <span id="abc">A smaller banana</span>
    <mdc-radio name="fruit"
                     [value]="value"
                     [aria-label]="ariaLabel"
                     [aria-labelledby]="ariaLabelledby"
                     [aria-describedby]="ariaDescribedby">
    </mdc-radio>
    <mdc-radio name="fruit" [touch]="touch" value="raspberry">Raspberry</mdc-radio>
    <mdc-radio id="nameless" value="no-name">No name</mdc-radio>
  `
})
class StandaloneRadioButtons {
  ariaLabel: string = 'Banana';
  ariaLabelledby: string = 'xyz';
  ariaDescribedby: string = 'abc';
  touch: boolean = false;
  value = 'banana';
}


@Component({
  template: `
  <mdc-radio-group [(ngModel)]="modelValue" (change)="lastEvent = $event">
    <mdc-form-field *ngFor="let option of options">
      <mdc-radio [value]="option.value"></mdc-radio>
      <label>{{option.label}}</label>
    </mdc-form-field>
  </mdc-radio-group>
  `
})
class RadioGroupWithNgModel {
  modelValue: string;
  options = [
    {label: 'Vanilla', value: 'vanilla'},
    {label: 'Chocolate', value: 'chocolate'},
    {label: 'Strawberry', value: 'strawberry'},
  ];
  lastEvent: MdcRadioChange;
}

@Component({
  template: `<mdc-radio id="id-1">One</mdc-radio>`
})
class DisableableRadioButton {
  @ViewChild(MdcRadio, {static: false}) radio: MdcRadio;

  set disabled(value: boolean) {
    this.radio.disabled = value;
  }
}

@Component({
  template: `
  <mdc-radio-group [formControl]="formControl">
    <mdc-radio value="1">One</mdc-radio>
  </mdc-radio-group>
  `
})
class RadioGroupWithFormControl {
  formControl = new FormControl();
}

@Component({
  template: `<mdc-radio [tabIndex]="tabIndex"></mdc-radio>`
})
class FocusableRadioButton {
  tabIndex: number;
}

@Component({
  template: `
  <mdc-radio-group name="group" [(ngModel)]="modelValue">
    <transcluding-wrapper *ngFor="let option of options">
      <mdc-radio [value]="option.value">{{option.label}}</mdc-radio>
    </transcluding-wrapper>
  </mdc-radio-group>
  `
})
class InterleavedRadioGroup {
  modelValue = 'strawberry';
  options = [
    {label: 'Vanilla', value: 'vanilla'},
    {label: 'Chocolate', value: 'chocolate'},
    {label: 'Strawberry', value: 'strawberry'},
  ];
}

@Component({
  selector: 'transcluding-wrapper',
  template: `
    <div><ng-content></ng-content></div>
  `
})
class TranscludingWrapper {}


@Component({
  template: `<mdc-radio tabindex="0"></mdc-radio>`
})
class RadioButtonWithPredefinedTabindex {}

@Component({
  template: `
    <form>
      <mdc-radio name="season" value="spring">Spring</mdc-radio>
      <mdc-radio name="season" value="summer">Summer</mdc-radio>
      <mdc-radio name="season" value="autum">Autumn</mdc-radio>
    </form>
    <form>
      <mdc-radio name="season" value="spring">Spring</mdc-radio>
      <mdc-radio name="season" value="summer">Summer</mdc-radio>
      <mdc-radio name="season" value="autum">Autumn</mdc-radio>
    </form>
    <form>
      <mdc-radio name="season" value="spring">Spring</mdc-radio>
      <mdc-radio name="season" value="summer">Summer</mdc-radio>
      <mdc-radio name="season" value="autum">Autumn</mdc-radio>
    </form>`
})
class MultipleFormsRadioButtons {}

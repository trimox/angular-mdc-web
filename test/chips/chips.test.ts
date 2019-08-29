import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed, fakeAsync, flush} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ENTER} from '@angular/cdk/keycodes';

import {dispatchFakeEvent, dispatchMouseEvent} from '../testing/dispatch-events';

import {
  MdcChipsModule,
  MdcChip,
  MdcChipSet,
  MdcChipRemovedEvent,
  MdcChipSelectionEvent,
  MdcIcon,
  MdcChipSetChange
} from '@angular-mdc/web';

describe('Chips', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcChipsModule, FormsModule],
      declarations: [
        ChipTest,
        ChipValue,
        ChipModel,
        ChipInput,
        ChipChoice,
        ChipFilter
      ]
    });
    TestBed.compileComponents();
  }));

  describe('MdcChip', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcChip;
    let testComponent: ChipTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(ChipTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcChip));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-chip by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-chip');
    });

    it('handles transitionend event', fakeAsync(() => {
      dispatchFakeEvent(testInstance.elementRef.nativeElement, 'transitionend');
    }));

    it('#should have leading icon', () => {
      expect(testInstance.leadingIcon).toBeDefined();
    });

    it('#should have trailing icon', () => {
      expect(testInstance._icons.last.trailing).toBe(true);
    });

    it('should make disabled chips non-focusable', () => {
      expect(testNativeElement.getAttribute('tabIndex')).toBe('0');

      testComponent.disabled = true;
      fixture.detectChanges();

      expect(testNativeElement.getAttribute('tabIndex')).toBeFalsy();
    });

    it('should emit icon click event', () => {
      spyOn(testComponent, 'iconInteraction');

      testComponent.trailingIcon.elementRef.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.iconInteraction).toHaveBeenCalledTimes(1);
    });

    it('expect disableRipple to be false', () => {
      expect(testInstance.disableRipple).toBe(false);
    });

    it('handles focus event', () => {
      testInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(testNativeElement);
    });

    it('handles click event', () => {
      testNativeElement.click();
      fixture.detectChanges();
    });

    it('is removable', () => {
      testComponent.removable = false;
      fixture.detectChanges();
    });

    it('#should apply primary class modifier', () => {
      testComponent.primary = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('ngx-mdc-chip--primary')).toBe(true);
    });

    it('#should apply secondary class modifier', () => {
      testComponent.secondary = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('ngx-mdc-chip--secondary')).toBe(true);
    });
  });

  describe('MdcChipSet', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcChipSet;
    let testComponent: ChipTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(ChipTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcChipSet));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-chip-set by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-chip-set');
    });

    it('#should apply filter class modifier', () => {
      expect(testDebugElement.nativeElement.classList.contains('mdc-chip-set--filter')).toBe(true);
      expect(testInstance.filter).toBe(true);
    });

    it('#should have selected chip ids defined', fakeAsync(() => {
      testInstance.choice = true;
      fixture.detectChanges();
      flush();

      testInstance.select('newsChip');
      fixture.detectChanges();
      flush();

      expect(testInstance.getSelectedChipIds()).toBeDefined();
    }));

    it('#should select a chip, and select another chip', fakeAsync(() => {
      testInstance.select('newsChip');
      fixture.detectChanges();
      flush();

      testInstance.select('removableChip');
      fixture.detectChanges();
      flush();
    }));

    it('#should select chip', fakeAsync(() => {
      testInstance.select('newsChip');
      fixture.detectChanges();
      flush();
    }));
  });

  describe('MdcChip value', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcChipSet;
    let testComponent: ChipValue;

    beforeEach(() => {
      fixture = TestBed.createComponent(ChipValue);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcChipSet));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should set value on chip', () => {
      testComponent.value = 'directions-1';
      fixture.detectChanges();
      expect(testInstance.value).toBe('directions-1');
      expect(testInstance.chips.first.value).toBe('directions-1');
    });

    it('#should set value on chip', () => {
      testComponent.value = 'weather-1';
      fixture.detectChanges();
      expect(testInstance.value).toBe('weather-1');
      expect(testInstance.chips.first.selected).toBe(false);
    });

    it('#should set value on chip with selectByValue', () => {
      testInstance.selectByValue('weather-1');
      fixture.detectChanges();
      expect(testInstance.value).toBe('weather-1');
      expect(testInstance.chips.first.selected).toBe(false);
    });

    it('#should set value on chip with selectByValue', () => {
      testInstance.selectByValue(['weather-1']);
      fixture.detectChanges();
      expect(testInstance.value).toBe('weather-1');
      expect(testInstance.chips.first.selected).toBe(false);
    });

    it('should emit changed event', () => {
      spyOn(testComponent, 'onChipSetChange');
      fixture.detectChanges();

      testInstance.chips.first.elementRef.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.onChipSetChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('MdcChip Model', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcChipSet;
    let testComponent: ChipModel;

    beforeEach(() => {
      fixture = TestBed.createComponent(ChipModel);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcChipSet));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should select first chip', () => {
      testInstance.chips.first.elementRef.nativeElement.click();
      fixture.detectChanges();
    });

    it('should set ngModel value', () => {
      testComponent.selectedFood = 'steak-1';
      fixture.detectChanges();
    });
  });

  describe('MdcChip Input', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcChipSet;
    let testComponent: ChipInput;

    beforeEach(() => {
      fixture = TestBed.createComponent(ChipInput);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcChipSet));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-chip by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-chip-set');
    });

    it('#should apply input class modifier', () => {
      expect(testDebugElement.nativeElement.classList.contains('mdc-chip-set--input')).toBe(true);
      expect(testInstance.input).toBe(true);
    });

    it('#should have textContent as value', () => {
      expect(testInstance.chips.first.value).toBeDefined();
    });

    it('should emit removed event', () => {
      spyOn(testComponent, 'chipRemoved');
      fixture.detectChanges();

      testInstance.chips.first._icons.first.elementRef.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.chipRemoved).toHaveBeenCalledTimes(1);
    });
  });

  describe('MdcChip Filter', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcChipSet;
    let testComponent: ChipFilter;

    beforeEach(() => {
      fixture = TestBed.createComponent(ChipFilter);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcChipSet));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-chip by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-chip-set');
    });

    it('#should apply filter class modifier', () => {
      expect(testDebugElement.nativeElement.classList.contains('mdc-chip-set--filter')).toBe(true);
      expect(testInstance.filter).toBe(true);
      expect(testInstance.chips.first.filter).toBe(true);

      dispatchMouseEvent(testComponent.icon.elementRef.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();
    });
  });

  describe('MdcChip Choice', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcChipSet;
    let testComponent: ChipChoice;

    beforeEach(() => {
      fixture = TestBed.createComponent(ChipChoice);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcChipSet));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-chip by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-chip-set');
    });

    it('#should apply choice class modifier', () => {
      expect(testDebugElement.nativeElement.classList.contains('mdc-chip-set--choice')).toBe(true);
      expect(testInstance.choice).toBe(true);
      expect(testInstance.chips.first.choice).toBe(true);
    });
  });
});

@Component({
  template: `
  <mdc-chip-set filter>
    <mdc-chip
      [disabled]="disabled"
      [removable]="removable"
      [primary]="primary"
      [secondary]="secondary"
      (trailingIconInteraction)="iconInteraction()"
      (selectionChange)="chipSelectionChange($event)">
      <mdc-chip-icon leading>face</mdc-chip-icon>
      <mdc-chip-text>Get Directions</mdc-chip-text>
      <mdc-chip-icon #trailingIcon trailing>more_vert</mdc-chip-icon>
    </mdc-chip>
    <mdc-chip id="removableChip" [removable]="removable" [disableRipple]="disableRipple">
      <mdc-chip-text>Get Weather</mdc-chip-text>
    </mdc-chip>
    <mdc-chip id="newsChip">
      <mdc-chip-text>Get News</mdc-chip-text>
    </mdc-chip>
  </mdc-chip-set>`,
})
class ChipTest {
  removable: boolean = true;
  disabled: boolean;
  primary: boolean;
  secondary: boolean;
  disableRipple: boolean;

  @ViewChild('trailingIcon', {static: false}) trailingIcon: MdcIcon;

  chipSelectionChange: (event?: MdcChipSelectionEvent) => void = () => {};
  iconInteraction: () => void = () => {};
}

@Component({
  template: `<mdc-chip-set filter>
  <mdc-chip>
    <mdc-chip-icon #icon leading>face</mdc-chip-icon>
    <mdc-chip-text>Alice</mdc-chip-text>
</mdc-chip>
</mdc-chip-set>`
})
class ChipFilter {
  @ViewChild('icon', {static: false}) icon: MdcIcon;
}

@Component({
  template: `<mdc-chip-set input>
  <mdc-chip label="Alice" (removed)="chipRemoved($event)">
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
</mdc-chip-set>`
})
class ChipInput {
  chipRemoved: (event?: MdcChipRemovedEvent) => void = () => {};
}

@Component({
  template: `<mdc-chip-set choice>
  <mdc-chip>
    <mdc-chip-text>Get Directions</mdc-chip-text>
  </mdc-chip>
</mdc-chip-set>`
})
class ChipChoice {
  chipSelectionChange: (event?: MdcChipSelectionEvent) => void = () => {};
}

@Component({
  template: `
  <mdc-chip-set [choice]="choice" [value]="value" (change)="onChipSetChange($event)">
    <mdc-chip [disabled]="disabled" value="directions-1">
      <mdc-chip-text>Get Directions</mdc-chip-text>
    </mdc-chip>
    <mdc-chip value="weather-1">
      <mdc-chip-text>Get Weather</mdc-chip-text>
    </mdc-chip>
    <mdc-chip value="news-1">
      <mdc-chip-text>Get News</mdc-chip-text>
    </mdc-chip>
  </mdc-chip-set>`,
})
class ChipValue {
  disabled: boolean;
  choice: boolean = true;
  value: any;

  onChipSetChange: (event?: MdcChipSetChange) => void = () => {};
}

@Component({
  template: `<mdc-chip-set [(ngModel)]="selectedFood">
  <mdc-chip *ngFor="let food of foods" [value]="food.value" [selected]="food.selected">
    {{food.viewValue}}
  </mdc-chip>
</mdc-chip-set>`
})
class ChipModel {
  selectedFood: any;

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak', selected: false},
    {value: 'pizza-1', viewValue: 'Pizza', selected: false},
    {value: 'tacos-2', viewValue: 'Tacos', selected: false},
  ];
}

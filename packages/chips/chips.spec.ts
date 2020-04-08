import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed, fakeAsync, flush} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ENTER} from '@angular/cdk/keycodes';

import {dispatchFakeEvent, dispatchMouseEvent} from '@angular-mdc/web/testing';

import {
  MdcChipsModule,
  MdcChip,
  MdcChipSet,
  MdcChipInteractionEvent,
  MdcChipSelectionEvent,
  MdcChipSetChange
} from './index';
import {MdcIcon} from '@angular-mdc/web/icon';

describe('Chips', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcChipsModule, FormsModule],
      declarations: [
        ChipTest,
        ChipValue,
        TestChip,
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

    // it('should emit icon click event', () => {
    //   spyOn(testComponent, 'iconInteraction');

    //   testComponent.trailingIcon.elementRef.nativeElement.click();
    //   fixture.detectChanges();
    //   expect(testComponent.iconInteraction).toHaveBeenCalledTimes(1);
    // });

    it('expect disableRipple to be false', () => {
      expect(testInstance.disableRipple).toBe(false);
    });

    it('handles click event', () => {
      testNativeElement.click();
      fixture.detectChanges();
    });

    it('is removable', () => {
      testComponent.removable = false;
      fixture.detectChanges();
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

  describe('MdcChip', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcChip;
    let testComponent: TestChip;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestChip);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcChip));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should set primary focus on chip', () => {
      testInstance.focusPrimaryAction();
      fixture.detectChanges();
    });

    it('#should set trailing icon focus on chip', () => {
      testInstance.focusTrailingAction();
      fixture.detectChanges();
    });

    it('#should default be removable', () => {
      expect(testInstance.removable).toBe(true);
    });

    it('#should not be input', () => {
      expect(testInstance.input).toBe(false);
    });

    it('#should run beginExit', () => {
      testInstance.remove();
      fixture.detectChanges();
    });

    it('#should not run beginExit', () => {
      testInstance.removable = false;
      fixture.detectChanges();
      testInstance.remove();
      fixture.detectChanges();
    });

    it('#should focus on chip when focus() is called', () => {
      testInstance.focus();
      fixture.detectChanges();
    });
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
    });

    it('#should set value on chip with selectByValue', () => {
      testInstance.selectByValue('weather-1');
      fixture.detectChanges();
      expect(testInstance.value).toBe('weather-1');
    });

    it('#should set value on chip with selectByValue', () => {
      testInstance.selectByValue(['weather-1']);
      fixture.detectChanges();
      expect(testInstance.value).toEqual(['weather-1']);
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

    it('should emit trailingIconInteraction event', () => {
      spyOn(testComponent, 'onTrailingIconInteraction');
      fixture.detectChanges();

      testInstance.chips.first._icons.first.elementRef.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.onTrailingIconInteraction).toHaveBeenCalledTimes(1);
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
      [removable]="removable"
      [touch]="touch"
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
  disableRipple: boolean;
  touch: boolean;

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
  <mdc-chip label="Alice" (trailingIconInteraction)="onTrailingIconInteraction($event)">
    <mdc-chip-icon trailing>cancel</mdc-chip-icon>
  </mdc-chip>
</mdc-chip-set>`
})
class ChipInput {
  onTrailingIconInteraction: (event?: MdcChipInteractionEvent) => void = () => {};
}

@Component({
  template: `<mdc-chip>
  <mdc-chip-icon trailing>cancel</mdc-chip-icon>
</mdc-chip>`
})
class TestChip {
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
    <mdc-chip value="directions-1">
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

import { Component, DebugElement, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent } from '../testing/dispatch-events';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcChipsModule],
      declarations: [ChipTest]
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
      expect(testInstance.icons.last.trailing).toBe(true);
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

    it('should emit removed event', () => {
      spyOn(testComponent, 'chipRemoved');
      testComponent.filter = true;
      fixture.detectChanges();

      testComponent.trailingIcon.elementRef.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.chipRemoved).toHaveBeenCalledTimes(1);
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

    it('#should apply choice class modifier', () => {
      testComponent.choice = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-chip-set--choice')).toBe(true);
      expect(testInstance.choice).toBe(true);
    });

    it('#should apply filter class modifier', () => {
      testComponent.filter = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-chip-set--filter')).toBe(true);
      expect(testInstance.filter).toBe(true);
    });

    it('#should apply input class modifier', () => {
      testComponent.input = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-chip-set--input')).toBe(true);
      expect(testInstance.input).toBe(true);
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
});

@Component({
  template: `
  <mdc-chip-set [choice]="choice" [filter]="filter" [input]="input" (change)="onChipSetChange($event)">
    <mdc-chip
      [disabled]="disabled"
      [removable]="removable"
      [primary]="primary"
      [secondary]="secondary"
      (trailingIconInteraction)="iconInteraction()"
      (selectionChange)="chipSelectionChange($event)"
      (removed)="chipRemoved($event)">
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
  </mdc-chip-set>
  `,
})
class ChipTest {
  removable: boolean = true;
  disabled: boolean;
  choice: boolean;
  filter: boolean;
  input: boolean;
  primary: boolean;
  secondary: boolean;
  disableRipple: boolean;

  @ViewChild('trailingIcon') trailingIcon: MdcIcon;

  onChipSetChange: (event?: MdcChipSetChange) => void = () => { };
  chipSelectionChange: (event?: MdcChipSelectionEvent) => void = () => { };
  chipRemoved: (event?: MdcChipRemovedEvent) => void = () => { };
  iconInteraction: () => void = () => { };
}

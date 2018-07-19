import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcChipsModule,
  MdcChip,
  MdcChipSet,
  MdcChipEvent,
  MdcChipSelectionEvent
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

    it('#should have leading icon', () => {
      expect(testInstance.icons.first.isLeading()).toBe(true);
    });

    it('#should have trailing icon', () => {
      expect(testInstance.icons.last.isTrailing()).toBe(true);
    });

    it('emits destroy on destruction', () => {
      spyOn(testComponent, 'chipDestroy').and.callThrough();

      // Force a destroy callback
      testComponent.shouldShow = false;
      fixture.detectChanges();

      expect(testComponent.chipDestroy).toHaveBeenCalledTimes(1);
    });

    it('should make disabled chips non-focusable', () => {
      expect(testNativeElement.getAttribute('tabIndex')).toBe('0');

      testComponent.disabled = true;
      fixture.detectChanges();

      expect(testNativeElement.getAttribute('tabIndex')).toBeFalsy();
    });

    it('allows removal', () => {
      spyOn(testComponent, 'chipRemove');

      testInstance.remove();
      fixture.detectChanges();
      expect(testComponent.chipRemove).toHaveBeenCalledWith({ chip: testInstance });
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

    it('is selected', () => {
      expect(testInstance.selected).toBeUndefined();
    });

    it('is selected', () => {
      testInstance.selected = true;
      fixture.detectChanges();
      expect(testInstance.selected).toBe(true);
      expect(testInstance.isSelected()).toBe(true);
    });

    it('is removable', () => {
      testComponent.removable = false;
      fixture.detectChanges();
    });

    it('expect leading chip icon to not be undefined', () => {
      expect(testInstance.getLeadingIcon()).toBeDefined();
    });

    it('#should apply primary class modifier', () => {
      testComponent.primary = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('ng-mdc-chip--primary')).toBe(true);
    });

    it('#should apply secondary class modifier', () => {
      testComponent.secondary = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('ng-mdc-chip--secondary')).toBe(true);
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
  });
});

@Component({
  template: `
  <mdc-chip-set [choice]="choice" [filter]="filter" [input]="input">
    <mdc-chip *ngIf="shouldShow"
    [disabled]="disabled"
    [primary]="primary"
    [secondary]="secondary"
    (focus)="chipFocus($event)"
    (selectionChange)="chipSelectionChange($event)"
    (removed)="chipRemove($event)"
    (destroyed)="chipDestroy($event)">
      <mdc-chip-icon leading>face</mdc-chip-icon>
      <mdc-chip-text>Get Directions</mdc-chip-text>
      <mdc-chip-icon trailing>more_vert</mdc-chip-icon>
    </mdc-chip>
    <mdc-chip [removable]="removable">
      <mdc-chip-text>Get Weather</mdc-chip-text>
    </mdc-chip>
  </mdc-chip-set>
  `,
})
class ChipTest {
  removable: boolean;
  shouldShow: boolean = true;
  disabled: boolean = false;
  choice: boolean = false;
  filter: boolean = false;
  input: boolean = false;
  primary: boolean = false;
  secondary: boolean = false;

  chipFocus: (event?: MdcChipEvent) => void = () => { };
  chipDestroy: (event?: MdcChipEvent) => void = () => { };
  chipSelectionChange: (event?: MdcChipSelectionEvent) => void = () => { };
  chipRemove: (event?: MdcChipEvent) => void = () => { };
}

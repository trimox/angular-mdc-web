import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcChipsModule,
  MdcChip,
  MdcChipSet,
  MdcChipEvent,
  MdcChipSelectionChange,
} from '@angular-mdc/web';

describe('Chips', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcChipsModule,
      ],
      declarations: [
        ChipTest,
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

    it('#should set selected to true', () => {
      testInstance.select();
      fixture.detectChanges();
      expect(testInstance.selected).toBe(true);
    });

    it('#should set selected to true', () => {
      testInstance.select();
      fixture.detectChanges();
      expect(testInstance.selected).toBe(true);
    });

    it('emits focus on click', () => {
      spyOn(testInstance, 'focus').and.callThrough();

      testNativeElement.click();

      expect(testInstance.focus).toHaveBeenCalledTimes(1);
    });

    // it('allows selection', () => {
    //   spyOn(testComponent, 'chipSelectionChange');
    //   expect(testNativeElement.classList).not.toContain('mdc-chip-selected');

    //   testComponent.selected = true;
    //   fixture.detectChanges();

    //   expect(testNativeElement.classList).toContain('mdc-chip-selected');
    //   expect(testComponent.chipSelectionChange)
    //     .toHaveBeenCalledWith({ source: testInstance, isUserInput: false, selected: true });
    // });

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

      testInstance._blur();
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
  });
});

@Component({
  template: `
  <mdc-chip-set [choice]="choice" [filter]="filter">
    <mdc-chip *ngIf="shouldShow" [selected]="selected"
    [disabled]="disabled" [removable]="removable"
    [selectable]="selectable"
    (focus)="chipFocus($event)"
    (selectionChange)="chipSelectionChange($event)"
    (removed)="chipRemove($event)"
    (destroyed)="chipDestroy($event)">
      <mdc-chip-icon leading>face</mdc-chip-icon>
      <mdc-chip-text>Get Directions</mdc-chip-text>
      <mdc-chip-icon trailing>more_vert</mdc-chip-icon>
    </mdc-chip>
    <mdc-chip>
      <mdc-chip-text>Get Weather</mdc-chip-text>
    </mdc-chip>
  </mdc-chip-set>
  `,
})
class ChipTest {
  selected: boolean = false;
  shouldShow: boolean = true;
  disabled: boolean = false;
  selectable: boolean = true;
  removable: boolean = true;
  choice: boolean = false;
  filter: boolean = false;

  chipFocus: (event?: MdcChipEvent) => void = () => { };
  chipDestroy: (event?: MdcChipEvent) => void = () => { };
  chipSelectionChange: (event?: MdcChipSelectionChange) => void = () => { };
  chipRemove: (event?: MdcChipEvent) => void = () => { };
}

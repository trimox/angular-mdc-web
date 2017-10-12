import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MdcList,
  MdcListItem,
  MdcListGroup,
  MdcListItemStart,
  MdcListDivider,
  MdcListModule,
  MdcIconModule,
} from '../../../src/lib/public_api';

describe('MdcListModule', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcListModule, MdcIconModule],
      declarations: [
        SimpleList,
        TestDivider,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('MdcList', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcList;
    let testComponent: SimpleList;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleList);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcList));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-list class', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-list');
    });

    it('#should apply class border', () => {
      testComponent.isBordered = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-list--border')).toBe(true);
    });

    it('#should apply class dense', () => {
      testComponent.isDense = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-list--dense')).toBe(true);
    });

    it('#should apply class two-line', () => {
      testComponent.isTwoline = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-list--two-line')).toBe(true);
    });

    it('#should apply class avatar', () => {
      testComponent.isAvatar = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-list--avatar-list')).toBe(true);
    });

    it('#should apply disableRipple', () => {
      testInstance.disableRipple = true;
      fixture.detectChanges();
    });

    describe('MdcListDivider', () => {
      let testDebugElement: DebugElement;
      let testInstance: MdcListDivider;
      let testComponent: TestDivider;

      beforeEach(() => {
        fixture = TestBed.createComponent(TestDivider);
        fixture.detectChanges();

        testDebugElement = fixture.debugElement.query(By.directive(MdcListDivider));
        testInstance = testDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
      });

      it('#should have mdc-list-divider--inset class', () => {
        testComponent.isInset = true;
        fixture.detectChanges();
        expect(testInstance.inset).toBe(true);

        expect(testDebugElement.nativeElement.classList).toContain('mdc-list-divider--inset');
      });

      describe('MdcListItem', () => {
        let testDebugElement: DebugElement;
        let testInstance: MdcListItem;
        let testComponent: SimpleList;

        beforeEach(() => {
          fixture = TestBed.createComponent(SimpleList);
          fixture.detectChanges();

          testDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
          testInstance = testDebugElement.componentInstance;
          testComponent = fixture.debugElement.componentInstance;

          it('#should have mdc-list-item class', () => {
            expect(testDebugElement.nativeElement.classList).toContain('mdc-list-item');
          });
        });
      });

      describe('MdcListGroup', () => {
        let testDebugElement: DebugElement;
        let testInstance: MdcListGroup;
        let testComponent: SimpleList;

        beforeEach(() => {
          fixture = TestBed.createComponent(SimpleList);
          fixture.detectChanges();

          testDebugElement = fixture.debugElement.query(By.directive(MdcListGroup));
          testInstance = testDebugElement.componentInstance;
          testComponent = fixture.debugElement.componentInstance;

          it('#should have mdc-list-group class', () => {
            expect(testDebugElement.nativeElement.classList).toContain('mdc-list-group');
          });
        });
      });
    });
  });
});

@Component({
  template:
  `
    <mdc-list-group>
      <mdc-list-group-subheader>Grouped Lists</mdc-list-group-subheader>
      <mdc-list [dense]="isDense" [border]="isBordered" [twoLine]="isTwoline" [avatar]="isAvatar">
        <mdc-list-item mdc-list-item-start [disableRipple]="isRippleDisabled">Test</mdc-list-item>
        <mdc-icon mdc-list-item-end>home</mdc-icon>
      </mdc-list>
    </mdc-list-group>
  `
})
class SimpleList {
  isDense: boolean = false;
  isBordered: boolean = false;
  isTwoline: boolean = false;
  isAvatar: boolean = false;
}

@Component({
  template:
  `
  <mdc-list-divider [inset]="isInset"></mdc-list-divider>
  `
})
class TestDivider {
  isInset: boolean = false;
}

import { Component, DebugElement, ViewChild } from '@angular/core';
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

    it('#should apply disableRipples', () => {
      testComponent.isRippleDisabled = false;
      fixture.detectChanges();
      expect(testInstance.disableRipple).toBe(false);
      expect(testInstance.isRippleDisabled()).toBe(false);
    });

    it('#should have mdc-list-divider--inset class', () => {
      testComponent.isInset = true;
      fixture.detectChanges();
      expect(testComponent.dividier.inset).toBe(true);
    });

    it('#should not be active', () => {
      testComponent.isItemActive = false;
      fixture.detectChanges();
      expect(testComponent.listitem.active).toBe(false);
      expect(testComponent.listitem.isActive()).toBe(false);
      expect(testComponent.listitem.select());
      expect(testComponent.listitem.hasClass('testing')).toBe(false);
    });
  });
});

@Component({
  template: `
    <mdc-list-group #group>
      <mdc-list-group-subheader>Grouped Lists</mdc-list-group-subheader>
      <mdc-list [dense]="isDense" [border]="isBordered" [twoLine]="isTwoline"
       [avatar]="isAvatar" [disableRipple]="isRippleDisabled">
        <mdc-list-item #listitem mdc-list-item-start [active]="isItemActive">Test
          <mdc-icon mdc-list-item-end>home</mdc-icon>
        </mdc-list-item>
        <mdc-list-divider #divider [inset]="isInset"></mdc-list-divider>
        <mdc-list-item>
          <mdc-list-item-text>
          Single-line item
          <mdc-list-item-secondary>Secondary text</mdc-list-item-secondary>
        </mdc-list-item-text>
        </mdc-list-item>
      </mdc-list>
    </mdc-list-group>
  `
})
class SimpleList {
  isDense: boolean = false;
  isBordered: boolean = false;
  isTwoline: boolean = false;
  isAvatar: boolean = false;
  isRippleDisabled: boolean = true;
  isItemActive: boolean = true;
  isInset: boolean = false;

  @ViewChild('divider') dividier: MdcListDivider;
  @ViewChild('listitem') listitem: MdcListItem;
  @ViewChild('group') group: MdcListGroup;
}

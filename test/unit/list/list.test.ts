import { Component, DebugElement, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MdcList,
  MdcListItem,
  MdcListGroup,
  MdcListDivider,
  MdcListModule,
  MdcIconModule,
} from '@angular-mdc/web';

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
      expect(testDebugElement.nativeElement.classList.contains('ng-mdc-list--border')).toBe(true);
    });

    it('#should apply class dense', () => {
      testComponent.isDense = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-list--dense')).toBe(true);
    });

    it('#should apply class two-line', () => {
      testComponent.lines = 2;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-list--two-line')).toBe(true);
    });

    it('#should apply class avatar', () => {
      testComponent.isAvatar = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-list--avatar-list')).toBe(true);
    });

    it('#should have mdc-list-divider--inset class', () => {
      testComponent.isInset = true;
      fixture.detectChanges();
      expect(testComponent.divider.inset).toBe(true);
    });

    it('#should not be selected', () => {
      testComponent.isItemSelected = false;
      fixture.detectChanges();
      expect(testComponent.listitem.selected).toBe(false);
    });

    it('#should be selected', () => {
      testComponent.listitem._getHostElement().click();
      testComponent.listitem._getHostElement().click();
      fixture.detectChanges();
      expect(testComponent.listitem.selected).toBe(true);
    });

    it('#should have divider padding', () => {
      testComponent.isPadded = true;
      fixture.detectChanges();
      expect(testComponent.divider.padded).toBe(true);
    });

    it('#should not be interactive', () => {
      testComponent.isInteractive = false;
      fixture.detectChanges();
      expect(testInstance.interactive).toBe(false);
    });
  });
});

@Component({
  template: `
    <mdc-list-group #group>
      <mdc-list-group-subheader>Grouped Lists</mdc-list-group-subheader>
      <mdc-list [dense]="isDense" [border]="isBordered" [lines]="lines"
       [avatar]="isAvatar" [interactive]="isInteractive" [multiple]="multiple">
        <mdc-list-item #listitem mdc-list-item-graphic [selected]="isItemSelected">Test
          <mdc-icon mdc-list-item-meta>home</mdc-icon>
        </mdc-list-item>
        <mdc-list-divider #divider [padded]="isPadded" [inset]="isInset"></mdc-list-divider>
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
  lines: number = 1;
  isAvatar: boolean = false;
  isInteractive: boolean = true;
  isItemSelected: boolean = true;
  isInset: boolean = false;
  isPadded: boolean = false;
  multiple: boolean = false;

  @ViewChild('divider') divider: MdcListDivider;
  @ViewChild('listitem') listitem: MdcListItem;
  @ViewChild('group') group: MdcListGroup;
}

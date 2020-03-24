import {Component, DebugElement, ViewChild} from '@angular/core';
import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {TAB, ENTER} from '@angular/cdk/keycodes';

import {dispatchFakeEvent, dispatchKeyboardEvent} from '../testing/dispatch-events';

import {
  MdcList,
  MdcListItem,
  MdcListGroup,
  MdcListDivider,
  MdcListModule,
} from '@angular-mdc/web/list';
import {MdcIconModule} from '@angular-mdc/web/icon';
import {MdcCheckboxModule} from '@angular-mdc/web/checkbox';

describe('MdcListModule', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcListModule, MdcIconModule, MdcCheckboxModule],
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

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(SimpleList);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcList));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    }));

    it('#should have mdc-list class', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-list');
    });

    it('#should apply class border', () => {
      testComponent.isBordered = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('ngx-mdc-list--border')).toBe(true);
    });

    it('#should apply class dense', () => {
      testComponent.isDense = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-list--dense')).toBe(true);
    });

    it('#should apply class two-line', () => {
      testComponent.twoLine = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-list--two-line')).toBe(true);
    });

    it('#should disable ripple', () => {
      testComponent.disableRipple = true;
      fixture.detectChanges();
      expect(testInstance.disableRipple).toBe(true);
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

    it('#first list item should be focused', () => {
      testInstance.focusFirstElement();
      fixture.detectChanges();
      expect(document.activeElement === testComponent.listitem.elementRef.nativeElement).toBe(true);

      testInstance.focusNextElement(1);
      fixture.detectChanges();

      testInstance.focusPrevElement(0);
      fixture.detectChanges();
    });

    it('#last list item should be focused', () => {
      testInstance.focusLastElement();
      fixture.detectChanges();
      expect(document.activeElement === testComponent.lastItem.elementRef.nativeElement).toBe(true);
    });

    it('#should handle keydown', () => {
      const event: Event = new KeyboardEvent('keydown', {
        'code': 'ArrowDown'
      });
      testDebugElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();
    });

    it('#should handle focusin', () => {
      const event: Event = new FocusEvent('focusin');
      testDebugElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();
    });

    it('#should handle focusout', () => {
      const event: Event = new FocusEvent('focusout');
      testDebugElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();
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

    it('#should have wrap focus true', () => {
      testComponent.wrapFocus = true;
      fixture.detectChanges();
      expect(testInstance.wrapFocus).toBe(true);
    });

    it('#should handle list item click', () => {
      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      listItemInstance.getListItemElement().click();
      fixture.detectChanges();
    });

    it('#should disable list item', () => {
      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      listItemInstance.selected = false;
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(listItemInstance.disabled).toBe(true);

      dispatchFakeEvent(listItemDebugElement.nativeElement, 'click');
      fixture.detectChanges();
      expect(listItemInstance.selected).toBe(false);

      dispatchFakeEvent(listItemDebugElement.nativeElement, 'keydown');
      fixture.detectChanges();
      expect(listItemInstance.selected).toBe(false);

      dispatchKeyboardEvent(listItemDebugElement.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();
      expect(listItemInstance.selected).toBe(false);
    });

    it('#should have value of `my-value` as selected', () => {
      testInstance.setSelectedValue('my-value');
      expect(testInstance.getSelectedValue()).toBe('my-value');
      expect(testInstance.getListItemByValue('my-value')).toBeDefined();
      expect(testInstance.getListItemIndexByValue('my-value')).toBe(0);
    });

    it('#should set selected index to list item index (1)', () => {
      testInstance.setSelectedIndex(1);
      fixture.detectChanges();
      expect(testInstance.getSelectedIndex()).toBe(1);
      expect(testInstance.getSelectedText()).toBe('Test info');
    });

    it('#should set focus to list item index (0)', () => {
      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));

      testInstance.focusItemAtIndex(0);
      fixture.detectChanges();
      expect(document.activeElement).toBe(listItemDebugElement.nativeElement, 'Expected focus to be on list item');
    });

    it('#should set focus to list item', () => {
      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      listItemInstance.focus();
      fixture.detectChanges();
      expect(document.activeElement).toBe(listItemDebugElement.nativeElement, 'Expected focus to be on list item');
    });

    it('#should set role to "test"', () => {
      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      listItemInstance.setRole('test');
      dispatchKeyboardEvent(listItemDebugElement.nativeElement, 'keydown', TAB);
      fixture.detectChanges();
      expect(listItemInstance.elementRef.nativeElement.getAttribute('role')).toBe('test');
    });
  });
});

@Component({
  template: `
    <mdc-list-group #group>
      <mdc-list-group-subheader>Grouped Lists</mdc-list-group-subheader>
      <mdc-list [dense]="isDense" [border]="isBordered" [wrapFocus]="wrapFocus" [twoLine]="twoLine"
       [singleSelection]="singleSelection" [disableRipple]="disableRipple"
       [avatar]="isAvatar" [interactive]="isInteractive" useSelectedClass [verticalOrientation]="verticalOrientation">
        <mdc-list-item #listitem mdcListItemGraphic [selected]="isItemSelected" [disabled]="disabled" value="my-value">Test
          <mdc-icon mdcListItemMeta>info</mdc-icon>
        </mdc-list-item>
        <mdc-list-item mdcListItemGraphic>Test
          <mdc-icon mdcListItemMeta>info</mdc-icon>
        </mdc-list-item>
        <mdc-list-divider #divider [padded]="isPadded" [inset]="isInset"></mdc-list-divider>
        <mdc-list-item>
          Single-line item
          <mdc-checkbox mdcListItemMeta></mdc-checkbox>
        </mdc-list-item>
        <mdc-list-item>
          Single-line item
          <mdc-checkbox mdcListItemMeta checked></mdc-checkbox>
        </mdc-list-item>
          <mdc-list-item #lastitem>
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
  twoLine: boolean;
  isAvatar: boolean = false;
  isInteractive: boolean = true;
  isItemSelected: boolean = true;
  isInset: boolean = false;
  isPadded: boolean = false;
  singleSelection: boolean;
  verticalOrientation: boolean;
  wrapFocus: boolean;
  disabled: boolean;
  disableRipple: boolean;

  @ViewChild('divider', {static: false}) divider: MdcListDivider;
  @ViewChild('listitem', {static: false}) listitem: MdcListItem;
  @ViewChild('lastitem', {static: false}) lastItem: MdcListItem;
  @ViewChild('group', {static: false}) group: MdcListGroup;
}

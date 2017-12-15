import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcDrawerModule,
  MdcListModule,
  MdcIconModule,
  MdcTemporaryDrawer,
} from '@angular-mdc/web';

describe('MdcTemporaryDrawer', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcDrawerModule, MdcListModule, MdcIconModule
      ],
      declarations: [
        SimpleTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcTemporaryDrawer;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTemporaryDrawer));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-temporary-drawer by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-temporary-drawer');
    });

    it('#should be closed', () => {
      testInstance.close();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(false);
    });

    it('#should be open', () => {
      testInstance.open();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(true);
    });

    it('#should be absolute postioned', () => {
      testComponent.isAbsolute = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-temporary-drawer--absolute')).toBe(true);
    });

    it('#should provide drawer width', () => {
      expect(testInstance.getDrawerWidth()).toBeGreaterThanOrEqual(0);
    });

    it('#should be rtl direction', () => {
      expect(testInstance.isRtl()).toBe(false);
    });

    it('#should be disabled item selection', () => {
      testInstance.disableItemSelect = true;
      fixture.detectChanges();
      expect(testInstance.getDisableItemSelect()).toBe(true);
    });

    it('#should be disabled item selection', () => {
      testInstance.setDisableItemSelect(false);
      fixture.detectChanges();
      expect(testInstance.disableItemSelect).toBe(false);
    });

    it('#should be disabled item selection', () => {
      testInstance.setDisableItemSelect(true);
      fixture.detectChanges();
      expect(testInstance.getDisableItemSelect()).toBe(true);
    });

    it('#should be closed after click', () => {
      testDebugElement.nativeElement.click();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(false);
    });
  });
});

@Component({
  template: `
  <mdc-temporary-drawer [disableItemSelect]="isDisableItemSelect" [absolute]="isAbsolute" [closeOnClick]="isCloseOnClick">
    <mdc-temporary-drawer-spacer>Angular MDC</mdc-temporary-drawer-spacer>
    <mdc-temporary-drawer-header>
      <mdc-temporary-drawer-header-content>
        header content
      </mdc-temporary-drawer-header-content>
    </mdc-temporary-drawer-header>
    <mdc-temporary-drawer-content>
      <mdc-list-group>
        <mdc-list>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>home</mdc-icon>Home
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>star</mdc-icon>Star
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>send</mdc-icon>Sent Mail
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>drafts</mdc-icon>Drafts
          </mdc-list-item>
        </mdc-list>
        <mdc-list-divider></mdc-list-divider>
        <mdc-list>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>email</mdc-icon>All Mail
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>delete</mdc-icon>Trash
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>report</mdc-icon>Spam
          </mdc-list-item>
        </mdc-list>
      </mdc-list-group>
    </mdc-temporary-drawer-content>
  </mdc-temporary-drawer>
  `,
})
class SimpleTest {
  isDisableItemSelect: boolean = false;
  isAbsolute: boolean = false;
  isCloseOnClick: boolean = true;
}

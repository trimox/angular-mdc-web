import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcDrawerModule,
  MdcListModule,
  MdcIconModule,
  MdcDrawerTemporary,
} from '@angular-mdc/web';

describe('MdcDrawerTemporary', () => {
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
    let testInstance: MdcDrawerTemporary;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcDrawerTemporary));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-drawer--temporary by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-drawer--temporary');
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
      expect(testDebugElement.nativeElement.classList.contains('ng-mdc-drawer--absolute')).toBe(true);
    });

    it('#should provide drawer width', () => {
      expect(testInstance.getDrawerWidth()).toBeGreaterThanOrEqual(0);
    });

    it('#should be rtl direction', () => {
      expect(testInstance.isRtl()).toBe(false);
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
  <mdc-drawer-temporary [absolute]="isAbsolute" [closeOnClick]="isCloseOnClick">
    <mdc-drawer-spacer>Angular MDC</mdc-drawer-spacer>
    <mdc-drawer-header>
      <mdc-drawer-header-content>
        header content
      </mdc-drawer-header-content>
    </mdc-drawer-header>
    <mdc-drawer-content>
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
    </mdc-drawer-content>
  </mdc-drawer-temporary>
  `,
})
class SimpleTest {
  isAbsolute: boolean = false;
  isCloseOnClick: boolean = true;
}

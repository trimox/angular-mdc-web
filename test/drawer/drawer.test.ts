import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcDrawerModule,
  MdcListModule,
  MdcIconModule,
  MdcDrawer,
} from '@angular-mdc/web';

describe('MdcDrawer', () => {
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
    let testInstance: MdcDrawer;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcDrawer));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-drawer--permanent', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-drawer--permanent');
    });

    it('#should set temporary', () => {
      testComponent.drawer = 'temporary';
      fixture.detectChanges();

      testInstance.close();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(false);
    });

    it('#should set persistent', () => {
      testComponent.drawer = 'persistent';
      fixture.detectChanges();

      testInstance.open();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(true);
    });

    it('#should set permanent', () => {
      testComponent.drawer = '';
      fixture.detectChanges();

      expect(testInstance.drawer).toBe('permanent');
    });

    it('#should be open', () => {
      testInstance.open();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(true);
    });

    it('#should be closed after opened twice in a row', () => {
      testComponent.drawer = 'persistent';
      fixture.detectChanges();

      testInstance.open();
      testInstance.open();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(false);
    });

    it('#should be closed after click', () => {
      testComponent.drawer = 'temporary';
      fixture.detectChanges();

      testDebugElement.nativeElement.click();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(false);
    });
  });
});

@Component({
  template: `
  <mdc-drawer [drawer]="drawer" [fixed]="isFixed" [fixedAdjustElement]="testcontent">
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
  </mdc-drawer>
  <div #testcontent></div>
  `,
})
class SimpleTest {
  drawer: string = 'permanent';
  fixed: boolean = true;
}

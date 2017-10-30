import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcDrawerModule,
  MdcPersistentDrawer,
} from '../../../src/lib/public_api';

describe('MdcPersistentDrawer', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcDrawerModule,
      ],
      declarations: [
        SimpleTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcPersistentDrawer;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcPersistentDrawer));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-persistent-drawer by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-persistent-drawer');
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
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
  <mdc-persistent-drawer>
    <mdc-persistent-drawer-spacer>Angular MDC</mdc-persistent-drawer-spacer>
    <mdc-persistent-drawer-header>
      <mdc-persistent-drawer-header-content>
        header content
      </mdc-persistent-drawer-header-content>
    </mdc-persistent-drawer-header>
    <mdc-persistent-drawer-content>
    </mdc-persistent-drawer-content>
  </mdc-persistent-drawer>
  `,
})
class SimpleTest {
}

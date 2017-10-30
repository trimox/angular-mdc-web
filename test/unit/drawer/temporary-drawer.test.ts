import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcDrawerModule,
  MdcTemporaryDrawer,
} from '../../../src/lib/public_api';

describe('MdcTemporaryDrawer', () => {
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
    let testInstance: MdcTemporaryDrawer;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcTemporaryDrawer));
      testNativeElement = testDebugElement.nativeElement;
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
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
  <mdc-temporary-drawer>
    <mdc-temporary-drawer-spacer>Angular MDC</mdc-temporary-drawer-spacer>
    <mdc-temporary-drawer-header>
      <mdc-temporary-drawer-header-content>
        header content
      </mdc-temporary-drawer-header-content>
    </mdc-temporary-drawer-header>
    <mdc-temporary-drawer-content>
    </mdc-temporary-drawer-content>
  </mdc-temporary-drawer>
  `,
})
class SimpleTest {
}

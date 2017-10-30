import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcDrawerModule,
  MdcPermanentDrawer,
} from '../../../src/lib/public_api';

describe('MdcPermanentDrawer', () => {
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
    let testInstance: MdcPermanentDrawer;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcPermanentDrawer));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-permanent-drawer by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-permanent-drawer');
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
  <mdc-permanent-drawer>
    <mdc-permanent-drawer-spacer>Angular MDC</mdc-permanent-drawer-spacer>
    <mdc-permanent-drawer-content>
    </mdc-permanent-drawer-content>
  </mdc-permanent-drawer>
  `,
})
class SimpleTest { }

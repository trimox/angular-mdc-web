import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcDrawerModule,
  MdcDrawerPermanent,
} from '@angular-mdc/web';

describe('MdcDrawerPermanent', () => {
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
    let testInstance: MdcDrawerPermanent;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcDrawerPermanent));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-drawer--permanent by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-drawer--permanent');
    });

    it('#should not have fixed class modifier', () => {
      testComponent.isFixed = false;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList).not.toContain('ng-mdc-drawer--permanent--fixed');
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
  <mdc-drawer-permanent [fixed]="isFixed">
    <mdc-drawer-spacer>Angular MDC</mdc-drawer-spacer>
    <mdc-drawer-content>
    </mdc-drawer-content>
  </mdc-drawer-permanent>
  `,
})
class SimpleTest {
  isFixed: boolean = true;
}

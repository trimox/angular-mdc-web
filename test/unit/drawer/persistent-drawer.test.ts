import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcDrawerModule,
  MdcDrawerPersistent,
} from '@angular-mdc/web';

describe('MdcDrawerPersistent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcDrawerModule
      ],
      declarations: [
        SimpleTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcDrawerPersistent;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcDrawerPersistent));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-drawer--persistent by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-drawer--persistent');
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

    it('#should provide drawer width', () => {
      expect(testInstance.getDrawerWidth()).toBeGreaterThanOrEqual(0);
    });

    it('#should be rtl direction', () => {
      expect(testInstance.isRtl()).toBe(false);
    });
  });
});

/** Simple component for testing. */
@Component({
  template: `
  <mdc-drawer-persistent>
    <mdc-drawer-spacer>Angular MDC</mdc-drawer-spacer>
    <mdc-drawer-header>
      <mdc-drawer-header-content>
        header content
      </mdc-drawer-header-content>
    </mdc-drawer-header>
    <mdc-drawer-content>
    </mdc-drawer-content>
  </mdc-drawer-persistent>
  `,
})
class SimpleTest { }

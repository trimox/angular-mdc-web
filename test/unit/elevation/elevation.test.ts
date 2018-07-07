import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcElevationModule,
  MdcElevation
} from '@angular-mdc/web';

describe('MdcElevation', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcElevationModule],
      declarations: [ElevationTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcElevation;
    let testComponent: ElevationTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(ElevationTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcElevation));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-elevation--z2 by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-elevation--z2');
    });

    it('#should throw error', () => {
      testComponent.elevation = 30;
      expect(() => { fixture.detectChanges() }).toThrow();
    });

    it('#should have mdc-elevation--z3 by default', () => {
      testComponent.elevation = 3;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList).toContain('mdc-elevation--z3');
    });
  });
});

@Component({
  template: `
  <div [mdcElevation]="elevation"></div>
  `,
})
class ElevationTest {
  elevation: number = 2;
}

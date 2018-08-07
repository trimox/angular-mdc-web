import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcShapeModule,
  MdcShapeContainer
} from '@angular-mdc/web';

describe('MdcShape', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcShapeModule],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcShapeContainer;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcShapeContainer));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should be created', () => {
      expect(testInstance).toBeTruthy();
    });

    it('#should have mdc-shape-container by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-shape-container');
    });
  });
});

@Component({
  template: `
    <mdc-shape-container class="demo-four-corner-container">
      <div mdcShapeContainerCorner="top-left"></div>
      <div mdcShapeContainerCorner="top-right"></div>
      <div mdcShapeContainerCorner="bottom-left"></div>
      <div mdcShapeContainerCorner="bottom-right"></div>
    </mdc-shape-container>
  `,
})
class SimpleTest { }

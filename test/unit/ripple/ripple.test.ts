import { Component, DebugElement, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcRippleModule,
  MdcRipple,
  MdcRippleComponent,
} from '@angular-mdc/web';

describe('MdcRippleComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcRippleModule],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcRippleComponent;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcRippleComponent));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should apply primary class modifier', () => {
      testComponent.primary = true;
      fixture.detectChanges();
      expect(testComponent.demodiv.nativeElement.classList.contains('mdc-ripple-surface--primary')).toBe(true);
      expect(testInstance.primary).toBe(true);
    });

    it('#should apply secondary class modifier', () => {
      testComponent.secondary = true;
      fixture.detectChanges();
      expect(testComponent.demodiv.nativeElement.classList.contains('mdc-ripple-surface--accent')).toBe(true);
      expect(testInstance.secondary).toBe(true);
    });
  });
});

@Component({
  template: `
  <mdc-ripple #demoripple [unbounded]="true" [primary]="primary" [secondary]="secondary"
   [attachTo]="demodiv" [disabled]="disabled">
    <div #demodiv>
      Click me
    </div>
  </mdc-ripple>
  `
})
class SimpleTest {
  @ViewChild('demodiv') demodiv;
  primary: boolean;
  secondary: boolean;
  disabled: boolean;
}

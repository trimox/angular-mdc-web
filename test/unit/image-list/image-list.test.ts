import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcImageListModule,
  MdcImageList
} from '@angular-mdc/web';

describe('MdcGridList', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcImageListModule],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcImageList;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcImageList));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should be created', () => {
      expect(testInstance).toBeTruthy();
    });

    it('#should have mdc-image-list by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-image-list');
    });

    it('#should apply mdc-image-list--masonry class based on property', () => {
      testComponent.masonry = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-image-list--masonry')).toBe(true);
    });

    it('#should apply mdc-image-list--with-text-protection class based on property', () => {
      testComponent.textProtection = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-image-list--with-text-protection')).toBe(true);
    });
  });
});

@Component({
  template: `
  <mdc-image-list [masonry]="masonry" [textProtection]="textProtection">
    <mdc-image-list-item>
      <mdc-image-list-image-aspect>
        <img mdcImageListImage src="https://material-components-web.appspot.com/images/photos/3x2/{{i+1}}.jpg" async />
      </mdc-image-list-image-aspect>
      <mdc-image-list-supporting>
        <span mdcImageListLabel>Text label</span>
      </mdc-image-list-supporting>
    </mdc-image-list-item>
   </mdc-image-list>
  `,
})
class SimpleTest {
  masonry: boolean = false;
  textProtection: boolean = false;
}

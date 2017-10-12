import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcIconModule,
  MdcIcon,
} from '../../../src/lib/public_api';

describe('MdcIcon', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcIconModule,
      ],
      declarations: [
        SimpleTest,
        FontAwesomeTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcIcon;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcIcon));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have material-icons', () => {
      expect(testDebugElement.nativeElement.classList).toContain('material-icons');
    });

    it('#should set the SvgElement', () => {
      testComponent.mySvg = 'test';
      fixture.detectChanges();
    });
  });

  describe('Font Awesome', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcIcon;
    let testComponent: FontAwesomeTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(FontAwesomeTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcIcon));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should not have material-icons', () => {
      expect(testDebugElement.nativeElement.classList.contains('material-icons')).toBe(false);
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-icon [svgIcon]="mySvg">{{myIcon}}</mdc-icon>
  `,
})
class SimpleTest {
  myIcon: string = 'home';
  mySvg: string = 'test';
}

/** Simple component for testing. */
@Component({
  template:
  `
    <button mdc-fab>
      <mdc-icon 
       fontSet="myFontSet"
       fontIcon="myFontIcon"></mdc-icon>
    </button>
  `,
})
class FontAwesomeTest {
  myFontSet: string = 'fa';
  myFontIcon: string = 'fa-keyboard-o';
}

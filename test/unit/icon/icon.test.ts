import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcIconModule,
  MdcIcon,
} from '@angular-mdc/web';

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
    it('#should have font size of 50', () => {
      testComponent.mySize = 50;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.style.fontSize).toBe('50px');

      testComponent.mySize = 30;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.style.fontSize).toBe('30px');
    });

    it('#should have font size of 24', () => {
      testComponent.mySize = null;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.style.fontSize).toBe('24px');
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
    <mdc-icon [fontSize]="mySize">{{myIcon}}</mdc-icon>
  `,
})
class SimpleTest {
  myIcon: string = 'home';
  mySize: number = 24;
}

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

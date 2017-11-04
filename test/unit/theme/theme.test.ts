import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcThemeModule,
  MdcThemeDark,
  MdcContent,
} from '../../../src/lib/public_api';

describe('MdcTheme', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcThemeModule,
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
    let testInstance: MdcThemeDark;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcThemeDark));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-theme--dark by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-theme--dark');
    });

    it('#should not have mdc-theme--dark', () => {
      testComponent.isDark = false;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList).not.toContain('mdc-theme--dark');
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
  <div [mdc-theme-dark]="isDark" mdc-content></div>
  `,
})
class SimpleTest {
  isDark: boolean = true;
}

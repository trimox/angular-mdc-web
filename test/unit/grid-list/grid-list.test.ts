import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcGridListModule,
  MdcGridList,
  MdcIconModule,
} from '@angular-mdc/web';

describe('MdcGridList', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcGridListModule, MdcIconModule],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcGridList;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcGridList));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should be created', () => {
      expect(testInstance).toBeTruthy();
      expect(testInstance.alignCenter());
    });

    it('#should have mdc-grid-list by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-grid-list');
    });

    it('#should apply mdc-grid-list--header-caption class based on property', () => {
      testComponent.header = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-grid-list--header-caption')).toBe(true);
    });

    it('#should apply mdc-grid-list--tile-gutter-1 class based on property', () => {
      testComponent.narrow = true;
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-grid-list--tile-gutter-1')).toBe(true);
    });

    it('#should apply mdc-grid-list--with-icon-align-end class based on property', () => {
      testComponent.iconAlign = 'end';
      fixture.detectChanges();
      expect(testDebugElement.nativeElement.classList.contains('mdc-grid-list--with-icon-align-end')).toBe(true);
    });
  });
});

@Component({
  template: `
    <mdc-grid-list [header]="header" [narrow]="narrow" [iconAlign]="iconAlign">
      <mdc-grid-tile>
        <mdc-grid-tile-primary>
          <mdc-grid-tile-primary-content></mdc-grid-tile-primary-content>
        </mdc-grid-tile-primary>
        <mdc-grid-tile-secondary>
          <mdc-icon>star_favorite</mdc-icon>
          <mdc-grid-tile-title>Single Very long Grid Title</mdc-grid-tile-title>
          <mdc-grid-tile-support-text>2nd</mdc-grid-tile-support-text>
        </mdc-grid-tile-secondary>
      </mdc-grid-tile>
    </mdc-grid-list>
  `,
})
class SimpleTest {
  header: boolean = false;
  narrow: boolean = false;
  iconAlign: string = 'start';
}

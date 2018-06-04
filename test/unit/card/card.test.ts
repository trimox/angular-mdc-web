import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcCardModule,
  MdcCard,
  MdcCardMediaContent
} from '@angular-mdc/web';

describe('MdcCard', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcCardModule],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcCard;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcCard));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-card by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-card');
    });
  });
});

@Component({
  template: `
    <mdc-card [outlined]="outlined">
      <mdc-card-primary-action>
        <mdc-card-media [square]="square" [wide]="wide">
          <mdc-card-media-content #mediaContent>
            Title
          </mdc-card-media-content>
        </mdc-card-media>
      </mdc-card-primary-action>
      <mdc-card-actions [fullBleed]="fullBleed">
        <mdc-card-action-buttons>
          <button mdc-button mdcCardAction="button">Action 1</button>
          <button mdc-button mdcCardAction="button">Action 2</button>
        </mdc-card-action-buttons>
      </mdc-card-actions>
    </mdc-card>
  `,
})
class SimpleTest {
  outlined: boolean = true;
  square: boolean = true;
  wide: boolean = false;
  fullBleed: boolean = true;
}

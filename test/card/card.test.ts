import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  MdcCardModule,
  MdcCard,
  MdcCardMedia,
  MdcCardMediaContent,
  MdcIconModule
} from '@angular-mdc/web';

describe('MdcCard', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcCardModule, MdcIconModule],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testNativeElement: HTMLElement;
    let testInstance: MdcCard;
    let testComponent: SimpleTest;

    let testDebugMediaElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcCard));
      testNativeElement = testDebugElement.nativeElement;
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;

      testDebugMediaElement = fixture.debugElement.query(By.directive(MdcCardMedia));
    });

    it('#should have mdc-card by default', () => {
      expect(testDebugElement.nativeElement.classList).toContain('mdc-card');
    });

    it('#should set to wide', () => {
      testComponent.wide = true;
      fixture.detectChanges();
      expect(testDebugMediaElement.nativeElement.classList.contains('mdc-card__media--16-9')).toBe(true);
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
      <mdc-card-action-icons>
        <button mdcIconButton mdcCardAction="icon">
          <mdc-icon mdcIconOn>favorite</mdc-icon>
          <mdc-icon>favorite_border</mdc-icon>
        </button>
        <mdc-icon mdcCardAction="icon" mdcRipple>share</mdc-icon>
        <mdc-icon mdcCardAction="icon" mdcRipple>more_vert</mdc-icon>
        <mdc-icon mdcCardAction mdcRipple>share</mdc-icon>
      </mdc-card-action-icons>
    </mdc-card>
  `,
})
class SimpleTest {
  outlined: boolean = true;
  square: boolean = true;
  wide: boolean = false;
  fullBleed: boolean = true;
}

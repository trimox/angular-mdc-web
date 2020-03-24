import {Component, DebugElement} from '@angular/core';
import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {
  MdcCardModule,
  MdcCard,
  MdcCardMedia,
  MdcCardAction
} from '@angular-mdc/web/card';
import {MdcIconModule} from '@angular-mdc/web/icon';

describe('MdcCard', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
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

    let testActionButtonDebugElement: DebugElement;
    let testActionButtonInstance: MdcCardAction;

    let testDebugMediaElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcCard));
      testActionButtonDebugElement = fixture.debugElement.query(By.directive(MdcCardAction));
      testActionButtonInstance = testActionButtonDebugElement.injector.get<MdcCardAction>(MdcCardAction);

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

    it('#should set action button to button', () => {
      testComponent.cardAction = 'button';
      fixture.detectChanges();
      expect(testActionButtonInstance.action).toBe('button');
    });

    it('#should set action button to icon', () => {
      testComponent.cardAction = 'icon';
      fixture.detectChanges();
      expect(testActionButtonInstance.action).toBe('icon');
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
        <div [mdcCardAction]="cardAction"></div>
        <mdc-card-action-buttons>
          <button mdc-button mdcCardAction="button">Action 2</button>
        </mdc-card-action-buttons>
      </mdc-card-actions>
      <mdc-card-action-icons>
        <button mdcIconButton mdcCardAction="icon">
          <mdc-icon mdcIconOn>favorite</mdc-icon>
          <mdc-icon>favorite_border</mdc-icon>
        </button>
        <mdc-icon mdcCardAction="icon" mdcRipple>share</mdc-icon>
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
  cardAction: string = 'button';
}

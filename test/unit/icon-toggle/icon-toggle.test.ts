import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcIconToggleComponent, MdcIconToggleModule } from '../../../src/lib/public_api';

describe('MdcIconToggleComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcIconToggleModule],
      declarations: [
        SimpleButton,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let buttonDebugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;
    let buttonInstance: MdcIconToggleComponent;
    let testComponent: SimpleButton;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleButton);
      fixture.detectChanges();

      buttonDebugElement = fixture.debugElement.query(By.directive(MdcIconToggleComponent));
      buttonNativeElement = buttonDebugElement.nativeElement;
      buttonInstance = buttonDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-icon-toggle by default', () => {
      expect(buttonDebugElement.nativeElement.classList)
        .toContain('mdc-icon-toggle', 'Expected buttons to have mdc-icon-toggle');
      expect(buttonInstance.isHostClass).toBe(true);
    });
  });
});

/** Simple component for testing. */
@Component({
  template:
  `
    <mdc-icon-toggle
      [disabled]="isDisabled"
      iconOn="favorite" iconOff="favorite_border"
      labelOn="Add to Favorites" labelOff="Remove from Favorites">
    </mdc-icon-toggle>
  `,
})
class SimpleButton {
  isDisabled: boolean = false;
}

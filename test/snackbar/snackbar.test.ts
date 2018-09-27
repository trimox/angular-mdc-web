import { NgModule, Component, Directive, DebugElement, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { async, inject, ComponentFixture, tick, flush, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MdcSnackbarModule,
  MdcSnackbar,
  MdcSnackbarComponent,
} from '@angular-mdc/web';

describe('MdcSnackbar', () => {
  let snackbar: MdcSnackbar;
  let simpleMessage = 'Simple message!';
  let simpleActionLabel = 'Ok';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcSnackbarModule],
      declarations: [SimpleSnack]
    });

    TestBed.compileComponents();
  }));

  describe('behaviors', () => {
    let testSnackbar: MdcSnackbar;
    let fixture: ComponentFixture<any>;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleSnack);
      snackbar = fixture.componentInstance.snackbar;
      fixture.detectChanges();
    });

    it('#should open a simple message', () => {
      snackbar.show(simpleMessage);
    });

    it('#should open a simple message with a button', fakeAsync(() => {
      let dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');
      let snackbarRef = snackbar.show(simpleMessage, simpleActionLabel);

      fixture.detectChanges();
      snackbarRef.afterDismiss().subscribe(undefined, undefined, dismissCompleteSpy);

      snackbarRef.dismiss();
      fixture.detectChanges();
      flush();

      expect(dismissCompleteSpy).toHaveBeenCalled();
    }));

    it('#should open a snackbar with config', () => {
      let snackbarRef = snackbar.show(simpleMessage, simpleActionLabel, { timeout: 3000, align: 'start', focusAction: true });
      fixture.detectChanges();
      snackbar.dismiss();
    });
  });
});

@Component({
  template: '',
  providers: [MdcSnackbar]
})
class SimpleSnack {
  constructor(public snackbar: MdcSnackbar) { }
}

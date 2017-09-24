import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MdcSnackbarComponent,
  MdcSnackbarModule,
} from '../../../src/lib/public_api';

describe('MdcSnackbarComponent', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcSnackbarModule],
      declarations: [
        SimpleSnack,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('behaviors', () => {
    let snackBarDebugElement: DebugElement;
    let snackBarInstance: MdcSnackbarComponent;
    let testComponent: SimpleSnack;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleSnack);
      fixture.detectChanges();

      snackBarDebugElement = fixture.debugElement.query(By.directive(MdcSnackbarComponent));
      snackBarInstance = snackBarDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-snackbar by default', () => {
      expect(snackBarDebugElement.nativeElement.classList)
        .toContain('mdc-snackbar', 'Expected to have mdc-snackbar');
    });

    it('#should apply class based on property', () => {
      testComponent.isAlignStart = true;
      fixture.detectChanges();
      expect(snackBarDebugElement.nativeElement.classList.contains('mdc-snackbar--align-start')).toBe(true);
    });

    it('#should show snackbar', () => {
      snackBarInstance.show({
        message: 'Message deleted',
        actionText: 'Undo',
      });
      fixture.detectChanges();
    });
  });
});

@Component({
  template:
  `
    <mdc-snackbar
      [alignStart]="isAlignStart">
    </mdc-snackbar>
  `
})
class SimpleSnack {
  isAlignStart: boolean = false;
}

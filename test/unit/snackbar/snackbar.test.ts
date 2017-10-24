import { NgModule, Component, Directive, DebugElement, ViewContainerRef, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { async, inject, tick, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MdcSnackbarModule,
  MdcSnackbar,
  MdcSnackbarComponent,
  MdcSnackbarConfig,
  MdcSnackbarRef,
  MdcSnackbarContainer,
} from '../../../src/lib/public_api';
import { OverlayContainer } from '../../../src/lib/cdk/overlay/index';

describe('MdcSnackbar', () => {
  let snackbar: MdcSnackbar;
  let overlayContainerElement: HTMLElement;

  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

  let simpleMessage = 'Simple message!';
  let simpleActionLabel = 'Ok';

  describe('behaviors', () => {
    let testSnackbar: MdcSnackbar;
    let overlayContainerElement: HTMLElement;
    let fixture: ComponentFixture<SimpleSnack>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [MdcSnackbarModule, SnackBarTestModule],
        declarations: [SimpleSnack],
        providers: [
          {
            provide: OverlayContainer, useFactory: () => {
              overlayContainerElement = document.createElement('div');
              return { getContainerElement: () => overlayContainerElement };
            }
          }
        ],
      });

      TestBed.compileComponents();
    }));

    beforeEach(inject([MdcSnackbar], (sb: MdcSnackbar) => {
      snackbar = sb;

      fixture = TestBed.createComponent(SimpleSnack);
      snackbar = fixture.componentInstance.snackbar;
      fixture.detectChanges();
    }));

    afterEach(() => {
      overlayContainerElement.innerHTML = '';
    });

    beforeEach(() => {
      viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

      viewContainerFixture.detectChanges();
      testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
    });

    it('#should open a simple message', () => {
      let snackBarRef = snackbar.show(simpleMessage);
      fixture.detectChanges();
    });

    it('#should open a simple message with a button', () => {
      let snackBarRef = snackbar.show(simpleMessage, simpleActionLabel);
      fixture.detectChanges();
    });

    it('#should open a snackbar with config', () => {
      let snackBarRef = snackbar.show(simpleMessage, simpleActionLabel, { timeout: 3000, align: 'start', focusAction: true });
      fixture.detectChanges();
    });

    it('#should dismiss an open snackbar', () => {
      let snackBarRef = snackbar.show(simpleMessage, simpleActionLabel);
      snackbar.dismiss();
      fixture.detectChanges();
    });
  });
});

@Directive({ selector: 'dir-with-view-container' })
class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'arbitrary-component',
  template: `<dir-with-view-container *ngIf="childComponentExists"></dir-with-view-container>`,
})
class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer) childWithViewContainer: DirectiveWithViewContainer;

  childComponentExists: boolean = true;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

@Component({
  template: '',
  providers: [MdcSnackbar]
})
class SimpleSnack {
  constructor(public snackbar: MdcSnackbar) { }
}

/** Simple component to open snackbars from.
 * Create a real (non-test) NgModule as a workaround forRoot
 * https://github.com/angular/angular/issues/10760
 */
const TEST_DIRECTIVES = [ComponentWithChildViewContainer, DirectiveWithViewContainer];

@NgModule({
  imports: [CommonModule, MdcSnackbarModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [ComponentWithChildViewContainer],
})
class SnackBarTestModule { }

import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed, fakeAsync, flush, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {TAB, DOWN_ARROW} from '@angular/cdk/keycodes';

import {dispatchFakeEvent, dispatchMouseEvent, dispatchKeyboardEvent} from '../testing/dispatch-events';

import {
  MdcDrawerModule,
  MdcDrawer,
} from '@angular-mdc/web/drawer';
import {MdcIconModule} from '@angular-mdc/web/icon';
import {MdcListModule, MdcListItem} from '@angular-mdc/web/list';
import {MdcButtonModule, MdcButton} from '@angular-mdc/web/button';

describe('MdcDrawer', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcDrawerModule, MdcListModule, MdcIconModule, MdcButtonModule
      ],
      declarations: [SimpleTest]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcDrawer;
    let testComponent: SimpleTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcDrawer));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should set dismissible', () => {
      testComponent.drawer = 'dismissible';
      fixture.detectChanges();
      expect(testInstance.dismissible).toBe(true);

      testInstance.open = false;
      fixture.detectChanges();
      expect(testInstance.open).toBe(false);
    });

    it('handles transitionend event', fakeAsync(() => {
      dispatchFakeEvent(testInstance.elementRef.nativeElement, 'transitionend');
      flush();
    }));

    it('#should set modal', fakeAsync(() => {
      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      testComponent.drawer = 'modal';
      fixture.detectChanges();
      flush();

      testInstance.open = true;
      fixture.detectChanges();
      flush();

      expect(testInstance.open).toBe(true);
      listItemInstance.getListItemElement().click();
      fixture.detectChanges();
      flush();
    }));

    it('#should be open', () => {
      testInstance.open = true;
      fixture.detectChanges();
      expect(testInstance.open).toBe(true);
    });

    it('#should have fixed adjust element', () => {
      expect(testInstance.fixedAdjustElement).toBeDefined();
    });

    it('#should not have fixed adjust element', () => {
      testInstance.fixedAdjustElement = null;
      fixture.detectChanges();
      expect(testInstance.fixedAdjustElement).toBeNull();
    });

    it('#should set autoFocus to false', () => {
      testComponent.autoFocus = false;
      fixture.detectChanges();
      expect(testInstance.autoFocus).toBe(false);
    });

    it('#should set restoreFocus to false', () => {
      testComponent.restoreFocus = false;
      fixture.detectChanges();
      expect(testInstance.restoreFocus).toBe(false);
    });

    it('#should open and restore focus to button', () => {
      testComponent.restoreFocus = true;
      testComponent.drawer = 'dismissible';
      fixture.detectChanges();

      testComponent.openButton.focus();
      fixture.detectChanges();

      dispatchMouseEvent(testComponent.openButton.elementRef.nativeElement, 'click');
      fixture.detectChanges();
      expect(testComponent.drawerComponent.open).toBe(true);
      expect(testComponent.open).toBe(true);

      testComponent.open = false;
      fixture.detectChanges();

      expect(document.activeElement).toEqual(testComponent.openButton.elementRef.nativeElement);
    });

    it('#should close modal on scrim click', fakeAsync(() => {
      testComponent.drawer = 'modal';
      fixture.detectChanges();
      flush();

      const drawerScrim = document.body.querySelector('.mdc-drawer-scrim');
      dispatchMouseEvent(drawerScrim, 'click');
      fixture.detectChanges();

      expect(testComponent.drawerComponent.open).toBe(false);
      expect(testComponent.open).toBe(false);
    }));

    it('#should set modal then change to dismissible', fakeAsync(() => {
      testComponent.drawer = 'modal';
      fixture.detectChanges();
      flush();

      testComponent.drawer = 'dismissible';
      fixture.detectChanges();
      flush();
    }));

    it('#should handle transitionend', fakeAsync(() => {
      testComponent.drawer = 'dismissible';
      fixture.detectChanges();
      flush();

      dispatchFakeEvent(testComponent.drawerComponent.elementRef.nativeElement, 'transitionend');
      fixture.detectChanges();
      tick();
    }));

    it('#should open and not restore focus to open button', () => {
      testComponent.restoreFocus = false;
      testComponent.drawer = 'dismissible';
      fixture.detectChanges();
      testComponent.drawer = 'dismissible';
      fixture.detectChanges();

      testComponent.openButton.focus();
      dispatchMouseEvent(testComponent.openButton.elementRef.nativeElement, 'click');
      fixture.detectChanges();
      testComponent.closeButton.focus();

      dispatchMouseEvent(testComponent.closeButton.elementRef.nativeElement, 'click');
      fixture.detectChanges();

      expect(document.activeElement).toBe(testComponent.closeButton.elementRef.nativeElement);
    });

    it('#should open from button', () => {
      testComponent.drawer = 'dismissible';
      fixture.detectChanges();

      dispatchFakeEvent(fixture.debugElement.query(By.directive(MdcButton)).nativeElement, 'click');
      fixture.detectChanges();

      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      listItemInstance.getListItemElement().click();
      fixture.detectChanges();
    });

    it('#should handle list item click', fakeAsync(() => {
      testComponent.open = true;
      fixture.detectChanges();

      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      listItemInstance.getListItemElement().click();
      fixture.detectChanges();
      flush();
    }));

    it('#should handle list item keydown', () => {
      testComponent.drawer = 'modal';
      testComponent.open = true;
      fixture.detectChanges();

      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      listItemInstance.focus();
      fixture.detectChanges();

      dispatchKeyboardEvent(listItemInstance.getListItemElement(), 'keydown', DOWN_ARROW);
      fixture.detectChanges();

      dispatchKeyboardEvent(listItemInstance.getListItemElement(), 'keydown', TAB);
      fixture.detectChanges();
    });
  });
});

@Component({
  template: `
  <mdc-drawer [drawer]="drawer" [open]="open" [fixedAdjustElement]="testcontent"
    [autoFocus]="autoFocus" [restoreFocus]="restoreFocus">
    <mdc-drawer-header title='Test' subtitle='Testing'></mdc-drawer-header>
    <mdc-drawer-content>
      <mdc-list-group>
        <mdc-list>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>home</mdc-icon>Home
          </mdc-list-item>
          <mdc-list-item cdkFocusInitial>
            <mdc-icon mdc-list-item-start>star</mdc-icon>Star
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>send</mdc-icon>Sent Mail
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>drafts</mdc-icon>Drafts
          </mdc-list-item>
          <mdc-list-divider></mdc-list-divider>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>email</mdc-icon>All Mail
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>delete</mdc-icon>Trash
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>report</mdc-icon>Spam
          </mdc-list-item>
        </mdc-list>
      </mdc-list-group>
    </mdc-drawer-content>
  </mdc-drawer>
  <div #testcontent></div>
  <button #openButton mdc-button (click)="open = true"></button>
  <button #closeButton mdc-button (click)="open = false"></button>
  `,
})
class SimpleTest {
  @ViewChild('openButton', {static: true}) openButton!: MdcButton;
  @ViewChild('closeButton', {static: true}) closeButton!: MdcButton;
  @ViewChild(MdcDrawer, {static: true}) drawerComponent!: MdcDrawer;

  drawer: string;
  open: boolean = false;
  autoFocus: boolean;
  restoreFocus: boolean;
}

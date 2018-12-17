import { Component, ElementRef, DebugElement, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../testing/dispatch-events';

import {
  TAB,
  DOWN_ARROW,
  MdcDrawerModule,
  MdcListModule,
  MdcIconModule,
  MdcListItem,
  MdcDrawer
} from '@angular-mdc/web';

describe('MdcDrawer', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdcDrawerModule, MdcListModule, MdcIconModule
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
    }));

    it('#should set permanent if empty', () => {
      testComponent.drawer = null;
      fixture.detectChanges();
      expect(testInstance.permanent).toBe(true);
    });

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
      fixture.detectChanges()
      expect(testInstance.fixedAdjustElement).toBeNull();
    });

    it('#should be closed after clicking document', fakeAsync(() => {
      testComponent.drawer = 'modal';
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);

      const drawerScrim = document.body.querySelector('.mdc-drawer-scrim');

      dispatchFakeEvent(drawerScrim, 'click');
      fixture.detectChanges();
      flush();

      expect(testInstance.open).toBe(false);

      testComponent.drawer = 'permanent';
      testComponent.open = true;
      fixture.detectChanges();
    }));

    it('#should handle list item click', fakeAsync(() => {
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);

      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      listItemInstance.getListItemElement().click();
      fixture.detectChanges();
    }));

    it('#should handle list item keydown', () => {
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
  <button (click)="testDrawer.open = !testDrawer.open" #openButton></button>
  <mdc-drawer #testDrawer [drawer]="drawer" [open]="open" [fixedAdjustElement]="testcontent">
    <mdc-drawer-header title='Test' subtitle='Testing'>
    </mdc-drawer-header>
    <mdc-drawer-content>
      <mdc-list-group>
        <mdc-list useActivatedClass>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>home</mdc-icon>Home
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>star</mdc-icon>Star
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>send</mdc-icon>Sent Mail
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdc-list-item-start>drafts</mdc-icon>Drafts
          </mdc-list-item>
        </mdc-list>
        <mdc-list-divider></mdc-list-divider>
        <mdc-list>
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
  `,
})
class SimpleTest {
  drawer: string = 'permanent';
  open: boolean;

  @ViewChild('testcontent') testContent;
  @ViewChild('openButton') openButton: ElementRef<HTMLButtonElement>;
}

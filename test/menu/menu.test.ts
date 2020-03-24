import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed, flush, fakeAsync, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DOWN_ARROW} from '@angular/cdk/keycodes';

import {dispatchFakeEvent, dispatchMouseEvent, dispatchKeyboardEvent} from '../testing/dispatch-events';

import {
  MdcMenu,
  MdcMenuModule,
} from '@angular-mdc/web/menu';
import {MdcIconModule} from '@angular-mdc/web/icon';
import {MdcButtonModule} from '@angular-mdc/web/button';
import {MdcListModule, MdcListItem} from '@angular-mdc/web/list';

describe('MdcMenu', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MdcMenuModule, MdcListModule, MdcButtonModule, MdcIconModule],
      declarations: [
        MenuTest,
        MenuWithNoList,
        MenuSelectionGroup
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcMenu;
    let testComponent: MenuTest;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MenuTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcMenu));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    }));

    it('#menu should open', () => {
      testComponent.open = true;
      fixture.detectChanges();
      expect(testInstance.open).toBe(true);
    });

    it('#should have focus', () => {
      expect(document.activeElement).not.toBe(testDebugElement.nativeElement);
    });

    it('#menu should quick open', () => {
      testComponent.quickOpen = true;
      fixture.detectChanges();
      expect(testInstance.quickOpen).toBe(true);
    });

    it('#menu should set fixed', () => {
      testComponent.fixed = false;
      fixture.detectChanges();
      expect(testInstance.fixed).toBe(false);
    });

    it('#menu should set closeSurfaceOnSelection to false', () => {
      testComponent.closeSurfaceOnSelection = false;
      fixture.detectChanges();
      expect(testInstance.closeSurfaceOnSelection).toBe(false);
    });

    it('#menu should set wrapFocus', () => {
      testComponent.wrapFocus = true;
      fixture.detectChanges();
      expect(testInstance.wrapFocus).toBe(true);
    });

    it('#menu should set anchor corner', () => {
      testComponent.anchorCorner = 'topEnd';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('topEnd');

      testComponent.anchorCorner = 'bottomEnd';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('bottomEnd');

      testComponent.anchorCorner = 'bottomStart';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('bottomStart');

      expect(testInstance.anchorMargin).toBeDefined();
      expect(testInstance.anchorElement).toBeDefined();
    });

    it('#should handle click event', () => {
      testDebugElement.nativeElement.click();
      fixture.detectChanges();
    });

    it('#should handle window object click event', fakeAsync(() => {
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);

      dispatchMouseEvent(document, 'click');
      fixture.detectChanges();
      tick(500);

      expect(testInstance.open).toBe(false);
    }));

    it('#should handle list item click', fakeAsync(() => {
      testComponent.open = true;
      fixture.detectChanges();
      flush();

      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      dispatchFakeEvent(listItemInstance.getListItemElement(), 'click');
      fixture.detectChanges();
    }));

    it('#should handle list item keydown', fakeAsync(() => {
      testComponent.open = true;
      fixture.detectChanges();
      tick(500);

      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      listItemInstance.focus();
      fixture.detectChanges();
      tick(500);

      dispatchKeyboardEvent(listItemInstance.getListItemElement(), 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      tick(500);
    }));
  });

  describe('MenuSelectionGroup', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcMenu;
    let testComponent: MenuSelectionGroup;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MenuSelectionGroup);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcMenu));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    }));

    it('#menu should open', fakeAsync(() => {
      testComponent.open = true;
      fixture.detectChanges();
      expect(testInstance.open).toBe(true);

      const listItemDebugElement = fixture.debugElement.query(By.directive(MdcListItem));
      const listItemInstance = listItemDebugElement.injector.get<MdcListItem>(MdcListItem);

      dispatchFakeEvent(listItemInstance.getListItemElement(), 'click');
      fixture.detectChanges();

      expect(listItemInstance.getListItemElement().classList.contains('.mdc-menu--selected'));
    }));

    it('#menu should set default focus state to firstItem', () => {
      testComponent.defaultFocusState = 2;
      fixture.detectChanges();
      expect(testInstance.defaultFocusState).toBe(2);
    });

    it('#menu should set default focus state to default (0)', () => {
      testComponent.defaultFocusState = null;
      fixture.detectChanges();
      expect(testInstance.defaultFocusState).toBe(0);
    });

    it('#menu should select first item', () => {
      testInstance._list.items.first.elementRef.nativeElement.click();
      fixture.detectChanges();
    });

    it('#menu should select first item, then second item', fakeAsync(() => {
      testInstance._list.items.first.elementRef.nativeElement.click();
      fixture.detectChanges();
      flush();

      testInstance._list.items.toArray()[1].elementRef.nativeElement.click();
      fixture.detectChanges();
    }));
  });

  describe('Menu with no List', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcMenu;
    let testComponent: MenuWithNoList;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(MenuWithNoList);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcMenu));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    }));

    it('#menu should open', () => {
      testComponent.open = true;
      fixture.detectChanges();
      expect(testInstance.open).toBe(true);
    });
  });
});

@Component({
  template: `
  <div mdcMenuSurfaceAnchor #testanchor>
    <mdc-menu [open]="open" [anchorCorner]="anchorCorner" (selected)="handleSelected($event)"
      [wrapFocus]="wrapFocus" [closeSurfaceOnSelection]="closeSurfaceOnSelection"
      [anchorElement]="testanchor" [quickOpen]="quickOpen" [fixed]="fixed"
      [anchorMargin]="{top: 0, right: 0, bottom: 0, left: 0}">
        <mdc-menu-selection-group>
          <div mdcMenuSelectionGroupIcon>
          <mdc-list>
            <mdc-list-item>Item 1</mdc-list-item>
            <mdc-list-item>Item 2</mdc-list-item>
          </mdc-list>
        </div>
        </mdc-menu-selection-group>
    </mdc-menu>
  </div>`,
})
class MenuTest {
  open: boolean;
  anchorCorner: string = 'topStart';
  quickOpen: boolean;
  fixed: boolean = true;
  wrapFocus: boolean;
  closeSurfaceOnSelection: boolean;

  handleSelected(event: {index: number, source: MdcListItem}) {}
}

@Component({
  template: `
  <div mdcMenuSurfaceAnchor #testanchor>
    <mdc-menu [open]="open" [anchorCorner]="anchorCorner" (selected)="handleSelected($event)"
      [wrapFocus]="wrapFocus" [closeSurfaceOnSelection]="closeSurfaceOnSelection"
      [anchorElement]="testanchor" [quickOpen]="quickOpen" [fixed]="fixed"
      [anchorMargin]="{top: 0, right: 0, bottom: 0, left: 0}">
    </mdc-menu>
  </div>`,
})
class MenuWithNoList {
  open: boolean;
  anchorCorner: string = 'topStart';
  quickOpen: boolean;
  fixed: boolean = true;
  wrapFocus: boolean;
  closeSurfaceOnSelection: boolean;

  handleSelected(event: {index: number, source: MdcListItem}) {}
}

@Component({
  template: `
  <div mdcMenuSurfaceAnchor #demoSelectionAnchor>
    <mdc-menu [open]="open" [anchorElement]="demoSelectionAnchor"
      [defaultFocusState]="defaultFocusState">
      <mdc-list>
        <mdc-menu-selection-group>
          <mdc-list-item>
            <mdc-icon mdcMenuSelectionGroupIcon>check</mdc-icon>
            Single
          </mdc-list-item>
          <mdc-list-item disabled>
            <mdc-icon mdcMenuSelectionGroupIcon>check</mdc-icon>
            1.15
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdcMenuSelectionGroupIcon>check</mdc-icon>
            Double
          </mdc-list-item>
          <mdc-list-item>
            <mdc-icon mdcMenuSelectionGroupIcon>check</mdc-icon>
            Custom: 1.2
          </mdc-list-item>
        </mdc-menu-selection-group>
        <mdc-list-divider></mdc-list-divider>
        <mdc-list-item>Add space before paragraph</mdc-list-item>
        <mdc-list-item>Add space after paragraph</mdc-list-item>
        <mdc-list-divider></mdc-list-divider>
        <mdc-list-item>Custom spacing...</mdc-list-item>
      </mdc-list>
    </mdc-menu>
  </div>`,
})
class MenuSelectionGroup {
  open: boolean;
  defaultFocusState: number;
}

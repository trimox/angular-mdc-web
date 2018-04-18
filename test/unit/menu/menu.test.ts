import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MdcMenu, MdcMenuModule } from '@angular-mdc/web';

describe('MdcMenu', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcMenuModule],
      declarations: [
        MenuTest,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic behaviors', () => {
    let testDebugElement: DebugElement;
    let testInstance: MdcMenu;
    let testComponent: MenuTest;

    beforeEach(() => {
      fixture = TestBed.createComponent(MenuTest);
      fixture.detectChanges();

      testDebugElement = fixture.debugElement.query(By.directive(MdcMenu));
      testInstance = testDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-menu by default', () => {
      expect(testDebugElement.nativeElement.classList)
        .toContain('mdc-menu', 'Expected to have mdc-menu');
    });

    it('#should be closed', () => {
      testInstance.close();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(false);
    });

    it('#should be open', () => {
      testInstance.open();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(true);
    });

    it('#should be toggled open', () => {
      testInstance.toggle();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(true);
    });

    it('#should be toggled closed', () => {
      testInstance.open();
      testInstance.toggle();
      fixture.detectChanges();
      expect(testInstance.isOpen()).toBe(false);
    });

    it('#should have focus', () => {
      expect(document.activeElement).not.toBe(testDebugElement.nativeElement);

      testInstance.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(testDebugElement.nativeElement);
    });

    it('#menu item should be enabled', () => {
      testComponent.isDisabled = false;
      fixture.detectChanges();
      expect(testInstance.options.toArray()[1].disabled).toBe(false);
    });

    it('#menu should quick open', () => {
      testComponent.quickOpen = true;
      fixture.detectChanges();
      expect(testInstance.quickOpen).toBe(true);
    });

    it('#menu should remember selection', () => {
      testComponent.rememberSelection = true;
      fixture.detectChanges();
      expect(testInstance.rememberSelection).toBe(true);
    });

    it('#menu should not remember selection', () => {
      testComponent.rememberSelection = false;
      fixture.detectChanges();
      expect(testInstance.rememberSelection).toBe(false);
    });

    it('#menu should set anchor corner', () => {
      testComponent.anchorCorner = 'top-end';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('top-end');

      testComponent.anchorCorner = 'bottom-end';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('bottom-end');

      testComponent.anchorCorner = 'bottom-start';
      fixture.detectChanges();
      expect(testInstance.anchorCorner).toBe('bottom-start');
    });

    it('#should handle click event', () => {
      testDebugElement.nativeElement.click();
    });

    it('#should get selected index', () => {
      testInstance.setSelectedIndex(2);
      fixture.detectChanges();
      expect(testInstance.getSelectedIndex()).toBe(2);
    });

    it('#should set max height of menu list', () => {
      testInstance.setMaxHeight('200');
      fixture.detectChanges();
      expect(testDebugElement.styles.maxHeight).toBe('200');
    });
  });
});

@Component({
  template: `
    <mdc-menu-anchor #testanchor>
      <mdc-menu [anchorCorner]="anchorCorner" (select)="handleSelect($event)" [anchor]="testanchor"
      (cancel)="handleCancel($event)" [quickOpen]="quickOpen" [rememberSelection]="rememberSelection">
        <mdc-menu-item id="0">Item 1</mdc-menu-item>
        <mdc-menu-item id="1" [disabled]="isDisabled">Item 2</mdc-menu-item>
        <mdc-menu-item id="2">Item 3</mdc-menu-item>
        <mdc-menu-divider></mdc-menu-divider>
        <mdc-menu-item id="3">Item 4</mdc-menu-item>
      </mdc-menu>
    </mdc-menu-anchor>
  `,
})
class MenuTest {
  anchorCorner: string = 'top-start';
  isDisabled: boolean = true;
  selectedIndex: number = -1;
  quickOpen: boolean = false;
  rememberSelection: boolean = false;

  handleSelect(event) { }
  handleCancel(event) { }
}

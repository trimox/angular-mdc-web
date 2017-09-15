import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MdcTabBarDirective,
  MdcTabComponent,
  MdcTabBarScrollerDirective,
  MdcTabModule
} from '../../../src/lib/public_api';

describe('MdcTabBarScroller', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcTabModule],
      declarations: [
        ScrollingTabs,
      ]
    });
    TestBed.compileComponents();
  }));

  describe('behaviors', () => {
    let tabScrollDebugElement: DebugElement;
    let tabScrollNativeElement: HTMLButtonElement;
    let tabScrollInstance: MdcTabBarScrollerDirective;
    let testComponent: ScrollingTabs;

    beforeEach(() => {
      fixture = TestBed.createComponent(ScrollingTabs);
      fixture.detectChanges();

      tabScrollDebugElement = fixture.debugElement.query(By.directive(MdcTabBarScrollerDirective));
      tabScrollNativeElement = tabScrollDebugElement.nativeElement;
      tabScrollInstance = tabScrollDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    });

    it('#should have mdc-tab-bar-scoller by default', () => {
      expect(tabScrollDebugElement.nativeElement.classList)
        .toContain('mdc-tab-bar-scoller', 'Expected to have mdc-tab-bar-scoller');
    });
  });
});

@Component({
  template:
  `
    <mdc-tab-bar-scroller>
      <mdc-tab-bar-scroll-back>
        <mdc-tab-bar-scroll-button material-icon>
          navigate_before
        </mdc-tab-bar-scroll-button>
      </mdc-tab-bar-scroll-back>
      <mdc-tab-bar-scroll-frame>
        <mdc-tab-bar [secondary]="isSecondary">
          <mdc-tab [active]="true">Item One</mdc-tab>
          <mdc-tab>Item Two</mdc-tab>
          <mdc-tab>Item Three</mdc-tab>
          <mdc-tab>Item Four</mdc-tab>
          <mdc-tab>Item Five</mdc-tab>
          <mdc-tab>Item Six</mdc-tab>
        </mdc-tab-bar>
      </mdc-tab-bar-scroll-frame>
      <mdc-tab-bar-scroll-forward>
        <mdc-tab-bar-scroll-button material-icon>
          navigate_next
        </mdc-tab-bar-scroll-button>
      </mdc-tab-bar-scroll-forward>
  </mdc-tab-bar-scroller>
`
})
class ScrollingTabs {
}

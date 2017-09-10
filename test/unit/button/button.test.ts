import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MdcButtonComponent, MdcButtonModule } from '../../../src/lib/button';
import { MdcRippleModule } from '../../../src/lib/ripple';

describe('MdcButtonComponent', () => {
  let component: MdcButtonComponent;
  let root: ComponentFixture<MdcButtonComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcButtonModule, MdcRippleModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    root = TestBed.createComponent(MdcButtonComponent);
    component = root.componentInstance;
    de = root.debugElement;
    el = de.nativeElement;
  });

  it('#disabled should be false initially', () => {
    root.detectChanges();
    expect(component.disabled).toBe(false);
  });
});

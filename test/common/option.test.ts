import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdcOption, MdcOptionModule } from '@angular-mdc/web/common';

describe('MdcOption component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdcOptionModule],
      declarations: [OptionWithDisable]
    }).compileComponents();
  }));

  it('should complete the `stateChanges` stream on destroy', () => {
    const fixture = TestBed.createComponent(OptionWithDisable);
    fixture.detectChanges();

    const optionInstance: MdcOption =
      fixture.debugElement.query(By.directive(MdcOption)).componentInstance;
    const completeSpy = jasmine.createSpy('complete spy');
    const subscription = optionInstance._stateChanges.subscribe(undefined, undefined, completeSpy);

    fixture.destroy();
    expect(completeSpy).toHaveBeenCalled();
    subscription.unsubscribe();
  });

  it('should not emit to `SelectionChange` if selecting an already-selected option', () => {
    const fixture = TestBed.createComponent(OptionWithDisable);
    fixture.detectChanges();

    const optionInstance: MdcOption =
      fixture.debugElement.query(By.directive(MdcOption)).componentInstance;

    optionInstance.select();
    expect(optionInstance.selected).toBe(true);

    const spy = jasmine.createSpy('selection change spy');
    const subscription = optionInstance.selectionChange.subscribe(spy);

    optionInstance.select();
    fixture.detectChanges();

    expect(optionInstance.selected).toBe(true);
    expect(spy).not.toHaveBeenCalled();

    subscription.unsubscribe();
  });

  it('should not emit to `onSelectionChange` if deselecting an unselected option', () => {
    const fixture = TestBed.createComponent(OptionWithDisable);
    fixture.detectChanges();

    const optionInstance: MdcOption =
      fixture.debugElement.query(By.directive(MdcOption)).componentInstance;

    optionInstance.deselect();
    expect(optionInstance.selected).toBe(false);

    const spy = jasmine.createSpy('selection change spy');
    const subscription = optionInstance.selectionChange.subscribe(spy);

    optionInstance.deselect();
    fixture.detectChanges();

    expect(optionInstance.selected).toBe(false);
    expect(spy).not.toHaveBeenCalled();

    subscription.unsubscribe();
  });
});

@Component({
  template: `<mdc-option [disabled]="disabled"></mdc-option>`
})
class OptionWithDisable {
  disabled: boolean;
}

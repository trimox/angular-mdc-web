import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  QueryList,
  Renderer2,
  SimpleChange,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { defer } from 'rxjs/observable/defer';
import { filter } from 'rxjs/operators/filter';
import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { toBoolean } from '@angular-mdc/web/common';

import { MdcListItem, MdcListSelectionChange } from './list-item';

@Directive({
  selector: '[mdc-list-group], mdc-list-group'
})
export class MdcListGroup {
  @HostBinding('class.mdc-list-group') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-group-subheader], mdc-list-group-subheader'
})
export class MdcListGroupSubheader {
  @HostBinding('class.mdc-list-group__subheader') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-list-divider], mdc-list-divider',
  template: '<div #nativeEl class="mdc-list-divider" role="seperator"></div>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcListDivider {
  private _inset: boolean = false;
  private _padded: boolean = false;

  @ViewChild('nativeEl') nativeEl: ElementRef;
  @Input()
  get inset(): boolean { return this._inset; }
  set inset(value: boolean) {
    this._inset = toBoolean(value);
    this._inset ? this._renderer.addClass(this.nativeEl.nativeElement, 'mdc-list-divider--inset')
      : this._renderer.removeClass(this.nativeEl.nativeElement, 'mdc-list-divider--inset');
  }

  @Input()
  get padded(): boolean { return this._padded; }
  set padded(value: boolean) {
    this._padded = toBoolean(value);
    this._padded ? this._renderer.addClass(this.nativeEl.nativeElement, 'mdc-list-divider--padded')
      : this._renderer.removeClass(this.nativeEl.nativeElement, 'mdc-list-divider--padded');
  }

  constructor(private _renderer: Renderer2) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-list',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcList implements AfterContentInit, OnChanges, OnDestroy {
  private _disableRipple: boolean = false;
  private _avatar: boolean = false;
  private _multiple: boolean = false;

  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input() dense: boolean = false;
  @Input() twoLine: boolean = false;
  @Input() border: boolean = false;
  @Input()
  get avatar(): boolean { return this._avatar; }
  set avatar(value: boolean) {
    this._avatar = toBoolean(value);
  }
  @Input()
  get disableRipple(): boolean { return this._disableRipple; }
  set disableRipple(value: boolean) {
    this._disableRipple = toBoolean(value);
  }
  @HostBinding('class.mdc-list') isHostClass = true;
  @HostBinding('attr.role') role: string = 'list';
  @HostBinding('class.mdc-list--dense') get classDenseList(): string {
    return this.dense ? 'mdc-list--dense' : '';
  }
  @HostBinding('class.mdc-list--two-line') get classTwoline(): string {
    return this.twoLine ? 'mdc-list--two-line' : '';
  }
  @HostBinding('class.mdc-list--avatar-list') get classAvatarList(): string {
    return this.avatar ? 'mdc-list--avatar-list' : '';
  }
  @HostBinding('class.mdc-list--border') get classBorder(): string {
    return this.border ? 'mdc-list--border' : '';
  }
  @ContentChildren(MdcListItem) options: QueryList<MdcListItem>;

  constructor(
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  /** Combined stream of all of the child options' change events. */
  optionSelectionChanges: Observable<MdcListSelectionChange> = defer(() => {
    if (this.options) {
      return merge(...this.options.map(option => option.onSelectionChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  });

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const disableRipple = changes['disableRipple'];
  }

  ngAfterContentInit(): void {
    this.optionSelectionChanges.pipe(
      takeUntil(merge(this._destroy, this.options.changes)),
      filter(item => item.source.selected)
    ).subscribe(item => {
      if (!this._multiple) {
        this._clearSelection(item.source);
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  private _clearSelection(skip?: MdcListItem): void {
    if (!this.options) {
      return;
    }

    this.options.forEach(option => {
      if (option !== skip) {
        option.deselect();
      }
    });
  }
}

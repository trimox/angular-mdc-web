import {
  AfterContentInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import { toBoolean, EventRegistry } from '@angular-mdc/web/common';

import { MdcRippleOrchestration } from './ripple.orchestration';

@Directive({
  selector: '[mdc-surface], mdc-surface',
  providers: [EventRegistry]
})
export class MdcSurfaceDirective extends MdcRippleOrchestration {
  @Input('mdc-surface')
  get mdcSurface() { return this.activeSurface; }
  set mdcSurface(value: boolean) {
    this.activeSurface = toBoolean(value);
  }
  @HostBinding('style.cursor') cursor: string = 'pointer';
  @HostBinding('class.mdc-ripple-surface') get classSurface(): string {
    return this.mdcSurface ? 'mdc-ripple-surface' : '';
  }

  constructor(
    private renderer: Renderer2,
    private registry: EventRegistry,
    public elementRef: ElementRef) {
    super(renderer, registry, elementRef);
  }
}

@Directive({
  selector: '[mdc-ripple], mdc-ripple',
  providers: [EventRegistry]
})
export class MdcRippleDirective extends MdcRippleOrchestration implements AfterContentInit {
  get ripple(): MdcRippleOrchestration {
    return this.ripple;
  }

  @Input() active: boolean = true;
  @Input() primary: boolean = false;
  @Input() secondary: boolean = false;
  @HostBinding('class.mdc-ripple-surface') get classSurface(): string {
    return this.active ? 'mdc-ripple-surface' : '';
  }
  @HostBinding('class.ng-mdc-ripple-surface--primary') get classPrimary(): string {
    return this.primary ? 'ng-mdc-ripple-surface--primary' : '';
  }
  @HostBinding('class.ng-mdc-ripple-surface--secondary') get classSecondary(): string {
    return this.secondary ? 'ng-mdc-ripple-surface--secondary' : '';
  }

  constructor(
    private renderer: Renderer2,
    private registry: EventRegistry,
    public elementRef: ElementRef) {
    super(renderer, registry, elementRef);
  }

  ngAfterContentInit(): void {
    this.init();
  }
}

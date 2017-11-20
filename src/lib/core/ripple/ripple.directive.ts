import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import { toBoolean } from '../../common';
import { EventRegistry } from '../../common/event-registry';

import { MdcRippleOrchestration } from './ripple.orchestration';

@Directive({
  selector: '[mdc-surface]',
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
  selector: '[mdc-ripple]',
  providers: [EventRegistry]
})
export class MdcRippleDirective extends MdcRippleOrchestration {
  @Input('mdc-ripple')
  get mdcRipple() { return this.activeSurface; }
  set mdcRipple(value: boolean) {
    this.activeSurface = toBoolean(value);
    value ? this.init() : this.destroy();
  }
  @HostBinding('class.mdc-ripple-surface') get classSurface(): string {
    return this.mdcRipple ? 'mdc-ripple-surface' : '';
  }

  constructor(
    private renderer: Renderer2,
    private registry: EventRegistry,
    public elementRef: ElementRef) {
    super(renderer, registry, elementRef);
  }
}

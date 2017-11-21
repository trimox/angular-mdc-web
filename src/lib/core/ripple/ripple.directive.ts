import {
  AfterContentInit,
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
  @Input() active: boolean = true;
  @Input() primary: boolean = false;
  @Input() secondary: boolean = false;
  @HostBinding('class.mdc-ripple-surface') get classSurface(): string {
    return this.active ? 'mdc-ripple-surface' : '';
  }
  @HostBinding('class.mdc-ripple-surface--primary') get classPrimary(): string {
    return this.primary ? 'mdc-ripple-surface--primary' : '';
  }
  @HostBinding('class.mdc-ripple-surface--accent') get classSecondary(): string {
    return this.secondary ? 'mdc-ripple-surface--accent' : '';
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

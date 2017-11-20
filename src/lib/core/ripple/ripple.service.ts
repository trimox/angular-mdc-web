import {
  ElementRef,
  Injectable,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { EventRegistry } from '../../common/event-registry';
import { MdcRippleOrchestration } from './ripple.orchestration';

@Injectable()
export class MdcRipple extends MdcRippleOrchestration implements OnDestroy {
  constructor(
    private renderer: Renderer2,
    private registry: EventRegistry,
    public elementRef: ElementRef) {
    super(renderer, registry, elementRef);
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}

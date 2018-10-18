import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { MdcMenuSurfaceAbstract } from './menu-surface.abstract';

@Component({
  moduleId: module.id,
  selector: 'mdc-menu-surface',
  exportAs: 'mdcMenuSurface',
  host: { 'class': 'mdc-menu-surface' },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcMenuSurface extends MdcMenuSurfaceAbstract implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.initMenuSurface();
  }

  ngOnDestroy(): void {
    this.destroyMenuSurface();
  }
}

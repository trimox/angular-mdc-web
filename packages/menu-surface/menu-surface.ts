import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { MdcMenuSurfaceBase } from './menu-surface-base';

@Component({
  moduleId: module.id,
  selector: 'mdc-menu-surface',
  exportAs: 'mdcMenuSurface',
  host: { 'class': 'mdc-menu-surface' },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcMenuSurface extends MdcMenuSurfaceBase implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.initMenuSurface();
  }

  ngOnDestroy(): void {
    this.destroyMenuSurface();
  }
}

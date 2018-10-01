import { NgModule, Provider } from '@angular/core';
import { PortalModule } from '@angular-mdc/web/portal';
import { Overlay } from './overlay';

export { ComponentType } from '@angular-mdc/web/portal';

@NgModule({
  imports: [PortalModule],
  providers: [Overlay]
})
export class OverlayModule { }

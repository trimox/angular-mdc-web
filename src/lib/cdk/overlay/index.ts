import { NgModule, Provider } from '@angular/core';

import { PortalModule } from '../portal/portal-directives';
import { Overlay } from './overlay';
import { OVERLAY_CONTAINER_PROVIDER } from './overlay-container';

export const OVERLAY_PROVIDERS: Provider[] = [
  Overlay,
  OVERLAY_CONTAINER_PROVIDER,
];

@NgModule({
  imports: [PortalModule],
  providers: [OVERLAY_PROVIDERS],
})
export class OverlayModule { }

export { Overlay } from './overlay';
export { OverlayRef } from './overlay-ref';
export * from './overlay-container';

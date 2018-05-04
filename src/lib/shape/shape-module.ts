import { NgModule } from '@angular/core';

import { MdcShapeContainer, MdcShapeContainerCorner } from './shape';

const SHAPE_DECLARATIONS = [
  MdcShapeContainer,
  MdcShapeContainerCorner
];

@NgModule({
  exports: [SHAPE_DECLARATIONS],
  declarations: [SHAPE_DECLARATIONS]
})
export class MdcShapeModule { }

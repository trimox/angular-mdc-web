import { NgModule } from '@angular/core';

import {
  MdcGridList,
  MdcGridListTiles,
  MdcGridTile,
  MdcGridTilePrimary,
  MdcGridTilePrimaryContent,
  MdcGridTileSecondary,
  MdcGridTileSupportText,
  MdcGridTileTitle,
} from './grid-list';

const GRID_LIST_DECLARATIONS = [
  MdcGridList,
  MdcGridListTiles,
  MdcGridTile,
  MdcGridTilePrimary,
  MdcGridTilePrimaryContent,
  MdcGridTileSecondary,
  MdcGridTileSupportText,
  MdcGridTileTitle,
];

@NgModule({
  exports: GRID_LIST_DECLARATIONS,
  declarations: GRID_LIST_DECLARATIONS,
})
export class MdcGridListModule { }

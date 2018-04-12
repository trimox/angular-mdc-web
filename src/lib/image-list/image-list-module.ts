import { NgModule } from '@angular/core';

import {
  MdcImageList,
  MdcImageListImage,
  MdcImageListImageAspect,
  MdcImageListItem,
  MdcImageListLabel,
  MdcImageListSupporting
} from './image-list';

const IMAGE_LIST_DECLARATIONS = [
  MdcImageList,
  MdcImageListImage,
  MdcImageListImageAspect,
  MdcImageListItem,
  MdcImageListLabel,
  MdcImageListSupporting
];

@NgModule({
  exports: IMAGE_LIST_DECLARATIONS,
  declarations: IMAGE_LIST_DECLARATIONS,
})
export class MdcImageListModule { }

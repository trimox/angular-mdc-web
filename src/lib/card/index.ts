import { NgModule } from '@angular/core';

import {
  MdcCard,
  MdcCardActionButton,
  MdcCardActions,
  MdcCardHorizontal,
  MdcCardMedia,
  MdcCardMediaItem,
  MdcCardPrimary,
  MdcCardSubtitle,
  MdcCardSupportingText,
  MdcCardTitle,
} from './card';

const CARD_COMPONENTS = [
  MdcCard,
  MdcCardActionButton,
  MdcCardActions,
  MdcCardHorizontal,
  MdcCardMedia,
  MdcCardMediaItem,
  MdcCardPrimary,
  MdcCardSubtitle,
  MdcCardSupportingText,
  MdcCardTitle,
];

@NgModule({
  exports: [CARD_COMPONENTS],
  declarations: [CARD_COMPONENTS],
})
export class MdcCardModule { }

export * from './card';

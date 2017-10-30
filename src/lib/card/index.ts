import { NgModule } from '@angular/core';

import { MdcRippleModule } from '../core/ripple/index';

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
  imports: [MdcRippleModule],
  exports: [CARD_COMPONENTS],
  declarations: [CARD_COMPONENTS],
})
export class MdcCardModule { }

export * from './card';

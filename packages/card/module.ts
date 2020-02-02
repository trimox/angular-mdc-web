import {NgModule} from '@angular/core';

import {
  MdcCard,
  MdcCardAction,
  MdcCardActionButtons,
  MdcCardActionIcons,
  MdcCardActions,
  MdcCardMedia,
  MdcCardMediaContent,
  MdcCardPrimaryAction
} from './card';

const CARD_DECLARATIONS = [
  MdcCard,
  MdcCardAction,
  MdcCardActionButtons,
  MdcCardActionIcons,
  MdcCardActions,
  MdcCardMedia,
  MdcCardMediaContent,
  MdcCardPrimaryAction
];

@NgModule({
  exports: CARD_DECLARATIONS,
  declarations: CARD_DECLARATIONS,
})
export class MdcCardModule { }

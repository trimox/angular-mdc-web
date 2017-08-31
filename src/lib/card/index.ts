import { NgModule } from '@angular/core';

import {
  MdcCardActionButtonDirective,
  MdcCardActionsDirective,
  MdcCardComponent,
  MdcCardHorizontalComponent,
  MdcCardMediaComponent,
  MdcCardMediaItemDirective,
  MdcCardPrimaryDirective,
  MdcCardSubtitleComponent,
  MdcCardSupportingTextDirective,
  MdcCardTitleDirective,
} from './card.component';

const CARD_COMPONENTS = [
  MdcCardActionButtonDirective,
  MdcCardActionsDirective,
  MdcCardComponent,
  MdcCardHorizontalComponent,
  MdcCardMediaComponent,
  MdcCardMediaItemDirective,
  MdcCardPrimaryDirective,
  MdcCardSubtitleComponent,
  MdcCardSupportingTextDirective,
  MdcCardTitleDirective,
];

@NgModule({
  exports: [CARD_COMPONENTS],
  declarations: [CARD_COMPONENTS],
})
export class MdcCardModule { }

export * from './card.component';

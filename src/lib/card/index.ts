import { NgModule } from '@angular/core';

import {
  CardActionButtonDirective,
  CardActionsDirective,
  CardComponent,
  CardHorizontalComponent,
  CardMediaComponent,
  CardMediaItemDirective,
  CardPrimaryDirective,
  CardSubtitleComponent,
  CardSupportingTextDirective,
  CardTitleDirective,
} from './card.component';

const CARD_COMPONENTS = [
  CardActionButtonDirective,
  CardActionsDirective,
  CardComponent,
  CardHorizontalComponent,
  CardMediaComponent,
  CardMediaItemDirective,
  CardPrimaryDirective,
  CardSubtitleComponent,
  CardSupportingTextDirective,
  CardTitleDirective,
];

@NgModule({
  exports: [CARD_COMPONENTS],
  declarations: [CARD_COMPONENTS],
})
export class CardModule { }

export * from './card.component';

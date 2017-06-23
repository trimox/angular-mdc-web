import { NgModule } from '@angular/core';

import { CardComponent } from './card.component';
import { CardPrimaryDirective } from './card-primary.directive';
import { CardSupportingTextDirective } from './card-supporting-text.directive';
import { CardTitleDirective } from './card-title.directive';
import { CardSubtitleComponent } from './card-subtitle.directive';
import { CardActionsDirective } from './card-actions.directive';
import { CardMediaItemDirective } from './card-media-item.directive';
import { CardMediaComponent } from './card-media.component';
import { CardHorizontalComponent } from './card-horizontal.component';

const CARD_COMPONENTS = [
  CardComponent,
  CardPrimaryDirective,
  CardTitleDirective,
  CardSubtitleComponent,
  CardSupportingTextDirective,
  CardActionsDirective,
  CardMediaItemDirective,
  CardHorizontalComponent,
  CardMediaComponent
];

@NgModule({
  exports: [CARD_COMPONENTS],
  declarations: [CARD_COMPONENTS],
})
export class CardModule { }

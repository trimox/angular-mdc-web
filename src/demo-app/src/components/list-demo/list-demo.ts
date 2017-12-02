import { Component } from '@angular/core';

@Component({
  selector: 'list-demo',
  templateUrl: './list-demo.html'
})
export class ListDemo {
  isSinglelineDense: boolean;
  isSingleDarkTheme: boolean;
  isSingleRippleDisabled: boolean = true;
  isTwolineDense: boolean;
  isTwoDarkTheme: boolean;
  isTwoRippleDisabled: boolean;
  isStartDetailDarkTheme: boolean;
  isStartEndDetailDarkTheme: boolean;
  isAvatarDense: boolean;
  isAvatarDarkTheme: boolean;
  isBordered: boolean = true;
}

import { Component } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.html'
})
export class AppLayout {
  coreVisible: boolean;
  buttonVisible: boolean;
  inputVisible: boolean;

  navigationLinks = [
    { name: 'Card', route: 'card-demo', icon: 'credit_card' },
    { name: 'Chips', route: 'chips-demo', icon: 'indeterminate_check_box' },
    { name: 'Dialog', route: 'dialog-demo', icon: 'question_answer' },
    { name: 'Drawer', route: 'drawer-demo', icon: 'code' },
    { name: 'Icon', route: 'icon-demo', icon: 'star' },
    { name: 'Linear Progress', route: 'linear-progress-demo', icon: 'compare_arrows' },
    { name: 'List', route: 'list-demo', icon: 'list' },
    { name: 'Menu', route: 'menu-demo', icon: 'menu' },
    { name: 'Snackbar', route: 'snackbar-demo', icon: 'info_outline' },
    { name: 'Tabs', route: 'tab-demo', icon: 'tab' },
    { name: 'Toolbar', route: 'toolbar-demo', icon: 'remove' },
  ];

  inputRoutes = [
    { name: 'Checkbox', route: 'checkbox-demo' },
    { name: 'Radio Buttons', route: 'radio-demo' },
    { name: 'Select', route: 'select-demo' },
    { name: 'Slider', route: 'slider-demo' },
    { name: 'Switch', route: 'switch-demo' },
    { name: 'Text Field', route: 'textfield-demo' },
  ];

  coreRoutes = [
    { name: 'Elevation', route: 'elevation-demo' },
    { name: 'Ripple', route: 'ripple-demo' },
    { name: 'Typography', route: 'typography-demo' },
  ];

  buttonRoutes = [
    { name: 'Button', route: '/button-demo' },
    { name: 'Floating Action Button (FAB)', route: '/fab-demo' },
    { name: 'Icon Toggle', route: '/icon-toggle-demo' },
  ];

  constructor(public media: ObservableMedia) { }
}

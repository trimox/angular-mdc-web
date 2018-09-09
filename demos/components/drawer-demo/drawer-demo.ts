import { Component } from '@angular/core';

export interface Destination {
  label?: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  templateUrl: './drawer-demo.html'
})
export class DrawerDemo {
  destinations = [
    {
      label: 'Inbox',
      icon: 'inbox'
    },
    {
      label: 'Star',
      icon: 'star'
    },
    {
      label: 'Sent Mail',
      icon: 'send'
    },
    {
      label: 'Drafts',
      icon: 'drafts'
    }
  ];

  alternateColors(input: any, className: string) {
    input.elementRef.nativeElement.classList.contains(className) ? input.elementRef.nativeElement.classList.remove(className) :
      input.elementRef.nativeElement.classList.add(className);
  }
}

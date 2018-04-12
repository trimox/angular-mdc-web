import { Component } from '@angular/core';

@Component({
  selector: 'grid-list-demo',
  templateUrl: './grid-list-demo.html',
})
export class GridListDemo {
  tiles = [
    { title: 'Single Very Long Grid Title', caption: 'Caption', icon: 'star_outline' },
    { title: 'Single Very Long Grid Title', caption: 'Caption', icon: 'star_outline' },
    { title: 'Single Very Long Grid Title', caption: 'Caption', icon: 'star_outline' },
    { title: 'Single Very Long Grid Title', caption: 'Caption', icon: 'star_outline' },
  ];
}

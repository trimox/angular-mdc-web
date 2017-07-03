import {
	Component,
  OnInit
} from '@angular/core';

@Component({
	selector: 'elevation-demo',
	templateUrl: './elevation-demo.component.html'
})
export class ElevationDemoComponent implements OnInit {
  items = Array.from(Array(25), (x, i) => i);

  ngOnInit() {
    let doc = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
    script.async = true;
    script.defer = true;
    doc.appendChild(script);
  }
}

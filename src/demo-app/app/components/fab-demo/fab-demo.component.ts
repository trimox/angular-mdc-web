import {
	Component,
  OnInit,
	ViewChild
} from '@angular/core';

@Component({
	selector: 'fab-demo',
	templateUrl: './fab-demo.component.html'
})
export class FabDemoComponent implements OnInit {

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

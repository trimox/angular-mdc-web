import {
	Component,
  OnInit
} from '@angular/core';

@Component({
	selector: 'switch-demo',
	templateUrl: './switch-demo.component.html'
})
export class SwitchDemoComponent implements OnInit {
  isSwitchOn: boolean;

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

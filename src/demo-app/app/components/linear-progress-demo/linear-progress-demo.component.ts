import {
	Component,
  AfterViewInit,
  OnInit,
  ViewChild
} from '@angular/core';
import { LinearProgressComponent } from '../../../../../src/lib/linear-progress/linear-progress';

@Component({
	selector: 'linear-progress-demo',
	templateUrl: './linear-progress-demo.component.html'
})
export class LinearProgressDemoComponent implements OnInit, AfterViewInit {
  @ViewChild('demobar1') demobar1: LinearProgressComponent;

  ngOnInit() {
    let doc = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
    script.async = true;
    script.defer = true;
    doc.appendChild(script);
  }

  ngAfterViewInit() {
    this.demobar1.progress = 0.5;
    this.demobar1.buffer = 0.65;
  }
}

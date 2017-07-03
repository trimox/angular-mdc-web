import {
	Component,
  OnInit
} from '@angular/core';

@Component({
	selector: 'textfield-demo',
	templateUrl: './textfield-demo.component.html'
})
export class TextfieldDemoComponent implements OnInit {
  username = null;
  password = null;
  comments = null;
  subject = null;
  message = null;

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

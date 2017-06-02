import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'snackbar-demo',
  templateUrl: './snackbar-demo.component.html'
})
export class SnackbarDemoComponent implements OnInit {
  @ViewChild('snack') snack;

  ngOnInit() {
    let doc = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sunburst';
    script.async = true;
    script.defer = true;
    doc.appendChild(script);
  }

  showSimple() {
    var data = {
      message: 'Notification received',
    }
    this.snack.show(data);
  }
  showActionButton() {
    var data = {
      message: 'Notification received',
      actionText: 'Ok',
      actionHandler: () => { console.log('Action button pressed!') }
    }
    this.snack.show(data);
  }
  showMultiline() {
    var data = {
      message: 'Notification received',
      actionText: 'Ok',
      multiline: true,
      actionHandler: () => { console.log('Action button pressed!') }
    }
    this.snack.show(data);
  }
  showMultilineBottom() {
    var data = {
      message: 'Notification received',
      actionText: 'Ok',
      multiline: true,
      actionOnBottom: true,
      actionHandler: () => { console.log('Action button pressed!') }
    }
    this.snack.show(data);
  }
}

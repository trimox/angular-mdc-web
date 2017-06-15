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
  isActionOnBottom: boolean;
  isMultiline: boolean;
  isDismissOnAction: boolean = true;
  messageText: string = "Sample text";
  actionText: string = "Ok";
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

  show() {
    this.snack.show({
      message: this.messageText ? this.messageText : 'Sample text',
      multiline: this.isMultiline || this.isActionOnBottom,
      actionOnBottom: this.isActionOnBottom,
      actionText: this.actionText,
      actionHandler: this.actionText ? () => { console.log('Action button pressed!') } : null
    }, this.isDismissOnAction);
  }
}

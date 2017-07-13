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
  message: any;
  @ViewChild('snack') snack: any;

  ngOnInit() {
    this.message = {
      message: 'Sample text',
      actionText: 'Ok',
    };
  }

  show() {
    this.snack.show(this.message);
  }
}

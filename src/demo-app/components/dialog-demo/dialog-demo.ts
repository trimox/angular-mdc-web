import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MdcDialog, MdcDialogComponent, MdcDialogRef, MdcTextField } from '@angular-mdc/web';

@Component({
  templateUrl: './dialog-demo.html',
})
export class DialogDemo {
  escapeToClose: boolean = true;
  clickOutsideToClose: boolean = true;
  backdrop: boolean = true;

  constructor(public dialog: MdcDialog) { }

  openSimple() {
    const dialogRef = this.dialog.open(DialogSimpleExample, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      backdrop: this.backdrop
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openScrolling() {
    const dialogRef = this.dialog.open(DialogScrollingExample, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      backdrop: this.backdrop
    });
  }

  openAlert() {
    const dialogRef = this.dialog.open(DialogAlertExample, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      backdrop: this.backdrop
    });
  }

  openNoFooter() {
    const dialogRef = this.dialog.open(DialogNoFooterExample, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      backdrop: this.backdrop
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(DialogFormExample, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      backdrop: this.backdrop,
      data: {userName: 'testing'}
    });
  }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-surface>
      <mdc-dialog-header title="Use Google's location service?"></mdc-dialog-header>
      <mdc-dialog-body>
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </mdc-dialog-body>
      <mdc-dialog-footer>
        <button mdc-dialog-button [cancel]="true">Decline</button>
        <button mdc-dialog-button [accept]="true" (click)="closeDialog()">Accept</button>
      </mdc-dialog-footer>
    </mdc-dialog-surface>
  </mdc-dialog>
  `,
})
export class DialogSimpleExample {
  constructor(public dialogRef: MdcDialogRef<DialogSimpleExample>) { }

  closeDialog(): void {
    this.dialogRef.close('Pizza');
  }
}

@Component({
  templateUrl: 'dialog-scrolling-example.html',
})
export class DialogScrollingExample {
  constructor(public dialogRef: MdcDialogRef<DialogScrollingExample>) { }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-surface>
      <mdc-dialog-header title='Discard draft?'></mdc-dialog-header>
      <mdc-dialog-footer>
        <button mdc-dialog-button [cancel]="true">Cancel</button>
        <button mdc-dialog-button [action]="true" [accept]="true">Discard</button>
      </mdc-dialog-footer>
    </mdc-dialog-surface>
  </mdc-dialog>
  `,
})
export class DialogAlertExample {
  constructor(public dialogRef: MdcDialogRef<DialogAlertExample>) { }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-surface>
      <mdc-dialog-header>
        <mdc-dialog-header-title>
          Set backup account
        </mdc-dialog-header-title>
      </mdc-dialog-header>
      <mdc-dialog-body>
        <mdc-list [avatar]="true">
          <mdc-list-item (click)="closeDialog()">
            <mdc-icon mdcListItemGraphic>person</mdc-icon>username@gmail.com
          </mdc-list-item>
          <mdc-list-item (click)="closeDialog()">
            <mdc-icon mdcListItemGraphic>person</mdc-icon>user02@gmail.com
          </mdc-list-item>
          <mdc-list-item (click)="closeDialog()">
            <mdc-icon mdcListItemGraphic>add</mdc-icon>add account
          </mdc-list-item>
        </mdc-list>
      </mdc-dialog-body>
    </mdc-dialog-surface>
  </mdc-dialog>
  `,
})
export class DialogNoFooterExample {
  constructor(public dialogRef: MdcDialogRef<DialogNoFooterExample>) { }

  closeDialog() {
    this.dialogRef.close();
  }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-surface>
      <mdc-dialog-header>
        <mdc-dialog-header-title>
          Profile
        </mdc-dialog-header-title>
      </mdc-dialog-header>
      <mdc-dialog-body>
        <form [formGroup]="userForm" id="userForm" (ngSubmit)="updateForm()">
          <mdc-text-field #input formControlName="username" label="Username" [required]="true"></mdc-text-field>
          <mdc-text-field-helper-text [validation]="true" [persistent]="false">Username is required</mdc-text-field-helper-text>
        </form>
      </mdc-dialog-body>
      <mdc-dialog-footer>
        <button mdc-dialog-button [cancel]="true">Cancel</button>
        <button mdc-dialog-button [action]="true" form="userForm">Update</button>
      </mdc-dialog-footer>
    </mdc-dialog-surface>
  </mdc-dialog>
  `,
})
export class DialogFormExample implements OnInit {
  userForm: FormGroup;
  @ViewChild('input') input: MdcTextField;

  constructor(public dialogRef: MdcDialogRef<DialogFormExample>) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl({ value: this.dialogRef.data.userName, disabled: false }, Validators.required)
    });
    // this.userForm.controls['username'].setValue('Sample name');
    // this.userForm.controls['username'].disable();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateForm() {
    if (!this.userForm.valid) {
      if (!this.input.valid) {
        this.input.setValid(false);
      }
      return;
    }
    this.closeDialog();
  }
}

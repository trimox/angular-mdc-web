import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MdcDialog, MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  templateUrl: './dialog-demo.html',
})
export class DialogDemo {
  escapeToClose: boolean = true;
  clickOutsideToClose: boolean = true;

  constructor(public dialog: MdcDialog) { }

  openAlert() {
    const dialogRef = this.dialog.open(DialogAlert, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      buttonsStacked: false,
      id: 'my-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSimple() {
    const dialogRef = this.dialog.open(DialogSimple, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openConfirmation() {
    const dialogRef = this.dialog.open(DialogConfirmation, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openScrollable(scrollable: boolean = true) {
    const dialogRef = this.dialog.open(DialogScrollable, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: scrollable
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(DialogForm, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true
    });
  }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Discard draft?</mdc-dialog-title>
        <mdc-dialog-actions>
          <button mdcDialogButton mdcDialogAction="close">Cancel</button>
          <button mdcDialogButton mdcDialogAction="accept">Discard</button>
        </mdc-dialog-actions>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `,
})
export class DialogAlert {
  constructor(public dialogRef: MdcDialogRef<DialogAlert>) { }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Select an account</mdc-dialog-title>
        <mdc-dialog-content>
          <mdc-list avatar>
            <mdc-list-item mdcDialogAction="close" [tabIndex]="0">
              <mdc-icon mdcListItemGraphic>person</mdc-icon>username@gmail.com
            </mdc-list-item>
            <mdc-list-item (click)="closeDialog()">
              <mdc-icon mdcListItemGraphic>person</mdc-icon>user02@gmail.com
            </mdc-list-item>
            <mdc-list-item (click)="closeDialog()">
              <mdc-icon mdcListItemGraphic>add</mdc-icon>add account
            </mdc-list-item>
          </mdc-list>
        </mdc-dialog-content>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `,
})
export class DialogSimple {
  constructor(public dialogRef: MdcDialogRef<DialogSimple>) { }

  closeDialog(): void {
    this.dialogRef.close('Pizza');
  }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Read my novel?</mdc-dialog-title>
        <mdc-dialog-content>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis, repudiandae dignissimos et quam velit autem mollitia tenetur, eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.

          Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel, consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium, excepturi!
          </p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis, repudiandae dignissimos et quam velit autem mollitia tenetur, eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.

          Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel, consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium, excepturi!
          </p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis, repudiandae dignissimos et quam velit autem mollitia tenetur, eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.

          Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel, consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium, excepturi!
          </p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis, repudiandae dignissimos et quam velit autem mollitia tenetur, eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.

          Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel, consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium, excepturi!
          </p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis, repudiandae dignissimos et quam velit autem mollitia tenetur, eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.

          Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel, consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium, excepturi!
          </p>
        </mdc-dialog-content>
        <mdc-dialog-actions>
          <button mdcDialogButton mdcDialogAction="close">Decline</button>
          <button mdcDialogButton mdcDialogAction="accept">Accept</button>
        </mdc-dialog-actions>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `
})
export class DialogScrollable {
  constructor(public dialogRef: MdcDialogRef<DialogScrollable>) { }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-container>
      <mdc-dialog-surface>
        <mdc-dialog-title>Phone ringtone</mdc-dialog-title>
        <mdc-dialog-content>
          <mdc-list>
            <mdc-list-item>
              <mdc-radio mdcListItemGraphic checked></mdc-radio>
              Never Gonna Give You Up
            </mdc-list-item>
            <mdc-list-item>
              <mdc-radio mdcListItemGraphic></mdc-radio>
              Hot Cross Buns
            </mdc-list-item>
            <mdc-list-item>
              <mdc-radio mdcListItemGraphic></mdc-radio>
              None
            </mdc-list-item>
          </mdc-list>
        </mdc-dialog-content>
        <mdc-dialog-actions>
          <button mdcDialogButton mdcDialogAction="close">Cancel</button>
          <button mdcDialogButton default mdcDialogAction="accept">Ok</button>
        </mdc-dialog-actions>
      </mdc-dialog-surface>
    </mdc-dialog-container>
  </mdc-dialog>
  `,
})
export class DialogConfirmation {
  constructor(public dialogRef: MdcDialogRef<DialogConfirmation>,
    @Inject(MDC_DIALOG_DATA) public data: DialogData) { }
}

@Component({
  templateUrl: './dialog-form-demo.html'
})
export class DialogForm {
  constructor(public dialogRef: MdcDialogRef<DialogConfirmation>,
    @Inject(MDC_DIALOG_DATA) public data: DialogData) { }

  profileForm = new FormGroup({
    first: new FormControl('', Validators.required),
    last: new FormControl('', Validators.required),
    middle: new FormControl(),
    dob: new FormControl('', [
      Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', Validators.email)
  });

  submit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.dialogRef.close();
  }
}

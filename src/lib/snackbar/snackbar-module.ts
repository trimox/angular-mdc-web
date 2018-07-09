import { NgModule } from '@angular/core';

import { MdcPortalService } from '@angular-mdc/web/portal';

import { MdcSnackbar } from './snackbar.service';
import { MdcSnackbarComponent } from './snackbar.component';

@NgModule({
  exports: [MdcSnackbarComponent],
  declarations: [MdcSnackbarComponent],
  providers: [MdcSnackbar, MdcPortalService],
  entryComponents: [MdcSnackbarComponent]
})
export class MdcSnackbarModule { }

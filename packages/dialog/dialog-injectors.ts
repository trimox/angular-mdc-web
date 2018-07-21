import { InjectionToken } from '@angular/core';
import { ComponentType } from '@angular-mdc/web/portal';

import { MdcDialogContainer } from './dialog-container';
import { MdcDialogConfig } from './dialog-config';
import { MdcDialogRef } from './dialog-ref';

/** Injection token for the Dialog's Data. */
export const DIALOG_DATA = new InjectionToken<any>('DialogData');

/** Injection token for the MdcDialogRef constructor. */
export const DIALOG_REF = new InjectionToken<MdcDialogRef<any>>('DialogRef');

/** Injection token for the MdcDialogConfig. */
export const DIALOG_CONFIG = new InjectionToken<MdcDialogConfig>('DialogConfig');

/** Injection token for the Dialog's MdcDialogContainer component. */
export const DIALOG_CONTAINER = new InjectionToken<ComponentType<MdcDialogContainer>>('DialogContainer');

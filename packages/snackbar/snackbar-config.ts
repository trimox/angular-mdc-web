export class MdcSnackbarConfig {
  timeout?: number = 2750;
  actionHandler?: Function;
  multiline?: boolean = false;
  actionOnBottom?: boolean = false;
  align?: string = 'center';
  dismissOnAction?: boolean = true;
  focusAction?: boolean = false;
}

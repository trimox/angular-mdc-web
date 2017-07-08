export interface SnackbarMessage {
  message: string;
  timeout?: number;
  actionHandler?: Function;
  actionText?: string;
  multiline?: boolean;
  actionOnBottom?: boolean;
}
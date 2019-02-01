import { Component } from '@angular/core';

@Component({
  templateUrl: './getting-started.html'
})
export class GettingStarted {
  npmCmd = `npm i @angular-mdc/web`;
  yarnCmd = `yarn add @angular-mdc/web`;
  materialIconsLink = `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"`;
  robotoLink = `<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">`;
  sassHelp = `$mdc-theme-primary: #1565c0; // primary color
$mdc-theme-secondary: #388e3c; // secondary color

@import "~@angular-mdc/theme/material";`;
}

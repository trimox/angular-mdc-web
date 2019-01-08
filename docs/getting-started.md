# Getting Started

- [Install Angular MDC](#installmdc)
- [Include MDC Sass](#importtheme)
- [Import component modules](#importmodules)

For help getting started with a new Angular app, check out the [Angular CLI](https://cli.angular.io/).

For existing apps, follow these steps to begin using Angular MDC.

## <a name="installmdc"></a> Step 1: Install Angular MDC
#### npm
```
npm i @angular-mdc/web
```

#### yarn
```
yarn add @angular-mdc/web
```

## <a name="importtheme"></a> Step 2: Use Roboto font
To get started, first include the Roboto font with the 300, 400 and 500 weights. You can host it yourself or include it from [Google Fonts](https://fonts.google.com/):
```html
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
```

## <a name="importtheme"></a> Step 3 (optional): Add Material Icons
If you want to use the `mdc-icon` component with the official Material Design Icons, load the icon font in your index.html:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
For more information on using Material Icons, check out the [Material Icons Guide](https://material.io/tools/icons/?style=baseline).

Note that `mdc-icon` supports any font or svg icons; using Material Icons is one of many options.

## <a name="importtheme"></a> Step 4: Include MDC Sass
In `styles.scss` add the following:
```sass
$mdc-theme-primary: #1565c0; // primary color example
$mdc-theme-secondary: #388e3c; // secondary color example

@import "~@angular-mdc/theme/material";
```

## <a name="importmodules"></a> Step 5: Import component modules
Now just import the NgModule for each component you want to use.
```ts
import {
  MdcButtonModule,
  MdcFabModule,
  MdcIconModule,
} from '@angular-mdc/web';

@NgModule({
  ...
  imports: [
   MdcButtonModule,
   MdcFabModule,
   MdcIconModule,
   ...
],
  ...
})
export class ExampleModule { }
```

Open `app.component.html` and add the following markup:
```html
<button mdc-button raised>My Button</button>

<button mdc-fab>
  <mdc-icon>edit</mdc-icon>
</button>
```

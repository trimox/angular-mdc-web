# Angular MDC - Getting started

 - [Step 1 - Install Angular MDC](#step1)
 - [Step 2 - Import Components](#step2)
 - [Step 3 - Import Theme](#step3)
 - [Step 4 - Include Material Design Icons](#step4)
 - [Step 5 - Include Roboto Font](#step5)

## Using Angular CLI?
If you intend to use Angular CLI, please reference [Angular CLI - Getting Started guide](https://github.com/trimox/angular-mdc-web/blob/master/docs/guide-angular-cli.md).

## <a name="step1"></a> Step 1: Install Angular MDC
```
npm i @angular-mdc/web
```

## <a name="step2"></a> Step 2: Import Components
Add an import of `MdcCoreModule` to provide ripple, typography, and elevation functionality. Now just import the NgModule for each component you want to use.
```ts
import {
  MdcCoreModule, // required
  MdcFabModule,
  MdcMenuModule
} from '@angular-mdc/web';

@NgModule({
  ...
  imports: [
   MdcCoreModule, // required
   MdcFabModule,
   MdcMenuModule,
   ...
],
  ...
})
export class ExampleModule { }
```

## <a name="step3"></a> Step 3: Import Angular MDC Theme
Import the Angular MDC theme into your project Sass:
```sass
$mdc-theme-primary: #1565c0; // change primary color example
$mdc-theme-secondary: #388e3c; // change secondary color example

@import "~@angular-mdc/theme/material";
```

## <a name="step4"></a> Step 4: Include Material Design Icons
Add the [Material Design Icons](https://material.io/icons/) collection to your `index.html`.

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## <a name="step5"></a> Step 5: Include Roboto Font
Add the Roboto font with 300, 400 and 500 weights to your `index.html`.

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
```

### All done!

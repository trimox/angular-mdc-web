# Angular MDC - Getting started

 - [Step 1 - Install Angular MDC](#step1)
 - [Step 2 - Import Components](#step2)
 - [Step 3 - Import MDC Theme](#step3)
 - [Step 4 - Include Material Design Icons](#step4)
 - [Step 5 - Include Roboto Font](#step5)
 - [Appendix - Configuring SystemJS](#config-systemjs)

## Using Angular CLI?
If you intend to use Angular CLI, please reference [Angular CLI - Getting Started guide](https://github.com/trimox/angular-mdc-web/blob/master/docs/guide-angular-cli.md).

## <a name="step1"></a> Step 1: Install Angular MDC
```
npm install --save @angular-mdc/web
```

## <a name="step2"></a> Step 2: Import Components
### All components
```ts
import { MaterialModule } from '@angular-mdc/web';

@NgModule({
  ...
  imports: [MaterialModule],
  ...
})
export class ExampleModule { }
```

### Or individual components
```ts
import {
  MdcTypographyModule,
  MdcMaterialIconModule,
  MdcFabModule,
  MdcMenuModule
} from '@angular-mdc/web';

@NgModule({
  ...
  imports: [
   MdcTypographyModule, // required
   MdcMaterialIconModule, // required for material icons
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
@import "@angular-mdc/theme/material";
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

## <a name="config-systemjs"></a> Appendix: Configuring SystemJS

If your project is using SystemJS for module loading, you will need to add `@angular-mdc/web`
to the SystemJS configuration:

```js
System.config({
  // existing configuration options
  map: {
    // ...
    '@angular-mdc/web': 'npm:@angular-mdc/web/bundles/material.umd.js',
    // ...
  }
});
```

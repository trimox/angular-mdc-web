Follow these steps to begin begin adopting Angular MDC.

 - [Step 1 - Install Angular MDC](#step1)
 - [Step 2 - Import Components](#step2)
 - [Step 3 - Apply MDC Theme](#step3)
 - [Step 4 - Include Material Design Icons](#step4)
 - [Step 5 - Include Roboto Font](#step5)
 - [Step 6 - Apply MDC Typography](#step6)
 - [Appendix - Sample index.html](#sample-html)
 - [Appendix - Configuring SystemJS](#config-systemjs)

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
import { FabModule, MenuModule } from '@angular-mdc/web';

@NgModule({
  ...
  imports: [FabModule, MenuModule],
  ...
})
export class ExampleModule { }
```

## <a name="step3"></a> Step 3: Apply MDC Theme
Including the MDC theme is required to apply all of the core and theme styles to your application.

If you're using the Angular CLI, you can add this to your styles.css:
```ts
@import "material-components-web/material-components-web";
```

Alternatively, you can use a CDN.
```html
<link href="https://unpkg.com/material-components-web/dist/material-components-web.css" rel="stylesheet">
```
Or link directly to the node_modules file.
```html
<link href="node_modules/material-components-web/dist/material-components-web.css" rel="stylesheet">
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

## <a name="step6"></a> Step 6: Apply MDC Typography
Add the `mdc-typography` directive to your body element to define basic properties for text, such as the Roboto typeface and antialiasing settings throughout your app.

```html
<body mdc-typography>
```

## <a name="sample-html"></a> Appendix: Sample index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Angular MDC</title>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link
      href="https://unpkg.com/material-components-web/dist/material-components-web.css" rel="stylesheet">
  </head>
  <body mdc-typography>
    <!--page content-->
  </body>
</html>
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

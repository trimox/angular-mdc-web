# Getting Started

### Install Angular MDC
```
npm install --save @angular-mdc/web
```

### Include all components
```ts
import { MaterialModule } from '@angular-mdc/web';

@NgModule({
  ...
  imports: [MaterialModule],
  ...
})
export class ExampleModule { }
```

### Or choose individual components
```ts
import { FabModule, MenuModule } from '@angular-mdc/web';

@NgModule({
  ...
  imports: [FabModule, MenuModule],
  ...
})
export class ExampleModule { }
```

### Use Material Design Icons
Add the [Material Design Icons](https://material.io/icons/) collection to your `index.html`.

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

### Use Roboto Font
Add the Roboto font with 300, 400 and 500 weights to your `index.html`.

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
  ```
### Apply MDC Typography
Add the `mdc-typography` directive to your body element to define basic properties for text, such as the Roboto typeface and antialiasing settings.
```html
<body mdc-typography>
```

### Sample index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Angular MDC</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </head>
  <body mdc-typography>
  </body>
</html>
```

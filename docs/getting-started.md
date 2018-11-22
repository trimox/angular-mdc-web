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

## <a name="importtheme"></a> Step 2: Include MDC Sass
In `styles.scss` add the following:
```sass
$mdc-theme-primary: #1565c0; // primary color example
$mdc-theme-secondary: #388e3c; // secondary color example

@import "~@angular-mdc/theme/material";
```

## <a name="importmodules"></a> Step 3: Import component modules
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

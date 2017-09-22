# Angular MDC - Get Started with Angular CLI

- [Step 1 - Install Angular CLI](#step1)
- [Step 2 - Install Angular MDC](#step2)
- [Step 3 - Configure Project](#step3)
- [Step 4 - Import Angular MDC](#step4)

> NOTE: This guide does not cover the usage of `yarn`.

## <a name="step1"></a> Step 1: Install Angular CLI
```
npm i -g @angular/cli
```

#### If generating a new project, you need to set default CSS preprocessor to `sass`:
```
ng new PROJECT-NAME --style=sass
cd PROJECT-NAME
```

#### On existing projects, you need to set default CSS preprocessor to `sass`:
```
ng set defaults.styleExt scss
```

## <a name="step2"></a> Step 2: Install Angular MDC
```
npm i @angular-mdc/web
```

## <a name="step3"></a> Step 3: Configure Project
In `src/styles.sass` add the following:
```css
@import "material-components-web/material-components-web";
```

In `angular-cli.json`, locate the following lines:
```json
"styles": [
  "styles.sass"
],
```

Add the following `stylePreprocessorOptions` directly after the `"styles"` block:
```json
"styles": [
  "styles.sass"
],
"stylePreprocessorOptions": {
	"includePaths": [
		".",
		"../node_modules",
		"../node_modules/@material/*",
		"styles"
	]
},
```

## <a name="step4"></a> Step 4: Import Angular MDC
In `src/app/app.module.ts` add the following:
```ts
import { MaterialModule } from '@angular-mdc/web';
```

Import the `MaterialModule` into your app module:
```ts
@NgModule({
  ...
  imports: [
    ...
    MaterialModule
   ],
  ...
})
```

Open `app.component.html` and add the following markup:
```html
<button mdc-button [primary]="true" [raised]="true">My Angular MDC Button</button>
```

Run `ng serve` to run your application in develop mode, and navigate to `http://localhost:4200`

### Have fun designing!

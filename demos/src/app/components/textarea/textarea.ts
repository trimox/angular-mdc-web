import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

import {MdcTextField} from '@angular-mdc/web/textfield';
import {ErrorStateMatcher} from '@angular-mdc/web/form-field';
import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({template: '<component-viewer></component-viewer>'})
export class Textarea implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Textarea',
      description: 'Text areas let users enter and edit text.',
      references: [{
        name: 'Material Design guidelines: Text Fields',
        url: 'https://material.io/design/components/text-fields.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/README.md#sass-mixins'},
        {name: 'Character Counter Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/character-counter/README.md#sass-mixins'},
        {name: 'Helper Text Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/helper-text/README.md#sass-mixins'},
        {name: 'Icon Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/icon/README.md#sass-mixins'},
      ],
      code: `import {MdcTextFieldModule} from '@angular-mdc/web/textfield';`,
      sass: `@use '@material/textfield/mdc-text-field';
@use '@material/textfield/_index' as textfield;`
    };
  }
}

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MdcTextarea',
          selectors: [
            'mdc-textarea',
          ],
          exportedAs: 'mdcTextarea',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'rows: number', summary: `Sets number of visible text lines.`},
                {name: 'cols: number', summary: `Sets the visible width of the textarea.`},
                {name: 'id: string', summary: `Unique id of the element.`},
                {
                  name: `type: TextFieldType`, summary: `String specifying the type of control to render.`,
                  summaryCode: `type TextFieldType = 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' |
  'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' | 'color';`},
                {name: 'name: string', summary: `Name of the textfield.`},
                {name: 'label: string', summary: `Shown to the user when there's no focus or values.`},
                {name: 'value: string', summary: `The input element's value.`},
                {name: 'fullwidth: boolean', summary: `Set to fullwidth textfield. Do not use outlined to style a full width text field.`},
                {name: 'disabled: boolean', summary: `Disables the component.`},
                {name: 'readonly: boolean', summary: `Whether or not the textfield value is editable.`},
                {name: 'required: boolean', summary: `Whether the element is required.`},
                {
                  name: 'charCounter: boolean', summary: `Character counter is used if there is a character limit. It displays the ratio of characters used and the total character limit.
                Requires *maxlength* to be set.`},
                {name: 'useNativeValidation: boolean', summary: `Sets whether to check native HTML validity state (true, default) or custom validity state when updating styles (false).`},
                {name: 'valid: boolean', summary: `Updates input validity styling using passed value.`},
                {name: 'empty: boolean', summary: `Returns whether the control is empty.`},
                {name: 'endAligned: boolean', summary: `Styles the text field with an end-aligned input.`},
                {
                  name: 'inputmode: TextFieldInputMode', summary: `Provides a hint to browsers for devices with onscreen keyboards to help them decide which keyboard to display.`,
                  summaryCode: `type TextFieldInputMode =
  'verbatim' | 'latin' | 'latin-name' | 'latin-prose' | 'full-width-latin' | 'kana' |
  'kana-name' | 'katakana' | 'numeric' | 'tel' | 'email' | 'url';`},
                {name: 'autocomplete: string', summary: `Indicates if the input can be automatically completed by the browser, usually by remembering previous values the user has entered.`},
                {name: 'tabIndex: number', summary: `Tab index of the text element.`},
                {name: 'maxlength: number', summary: `Maxlength of characters allowed to be entered.`},
                {name: 'minlength: number', summary: `Specifies the minimum number of characters that the user can enter.`},
                {name: 'helper: string', summary: `Helper text to display below the input when focused.`},
                {name: 'helperPersistent: boolean', summary: 'Always show the helper text despite focus.'},
                {name: 'validationMessage: string', summary: 'Message to show in the error color when the textfield is invalid. (Helper text will not be visible)'},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'focus()', summary: `Sets focus to the input.`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'change(value)', summary: `Emitted when an alteration to the element value is committed.`},
                {name: 'blur(value)', summary: `Emitted whenever the input loses focus.`},
                {name: 'input(value)', summary: `Emitted synchronously when the value has been altered.`},
                {name: 'focus(boolean)', summary: `Emitted when the input gains or loses focus.`},
              ]
            },
          ]
        },
        {
          header: 'MdcTextFieldIcon',
          selectors: [
            'mdc-icon[mdcTextFieldIcon]',
          ],
          exportedAs: 'mdcTextFieldIcon',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'leading: boolean', summary: `Styles the text field as a text field with a leading icon.`},
                {name: 'trailing: boolean	', summary: `Styles the text field as a text field with a trailing icon.`},
              ]
            },
          ]
        },
      ]
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  matcher = new MyErrorStateMatcher();

  alternateColors(input: MdcTextField) {
    if (input.textarea) {
      const demoTextarea = 'demo-textarea';

      input.elementRef.nativeElement.classList.contains(demoTextarea) ?
        input.elementRef.nativeElement.classList.remove(demoTextarea)
        : input.elementRef.nativeElement.classList.add(demoTextarea);
    } else {
      const demoFullwidth = 'demo-fullwidth-input';

      input.elementRef.nativeElement.classList.contains(demoFullwidth) ?
        input.elementRef.nativeElement.classList.remove(demoFullwidth)
        : input.elementRef.nativeElement.classList.add(demoFullwidth);
    }
  }

  //
  // Examples
  //

  exampleTextarea = {
    html: `<mdc-textarea label="Comments" rows="4" cols="40" required
  helper="Helper text" validationMessage="Comments are required"></mdc-textarea>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_text-field.scss`
  };

  exampleCounter = {
    html: `<mdc-textarea label="Comments" rows="2" cols="20" required maxlength="18"
  charCounter></mdc-textarea>`
  };

  exampleCounterWithHelper = {
    html: `<mdc-textarea label="Comments" rows="2" cols="20" required maxlength="140"
  helper="Helper text" charCounter></mdc-textarea>`
  };

  exampleNoLabel = {
    html: `<mdc-textarea rows="2" cols="20"></mdc-textarea>`
  };

  exampleFullWidth = {
    html: `<mdc-textarea label="Type your message here" fullwidth required
  rows="4" helper="Helper text" validationMessage="Message required"></mdc-textarea>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_text-field.scss`
  };

}

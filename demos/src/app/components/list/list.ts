import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-viewer></component-viewer>'})
export class List implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Lists',
      description: 'Lists are continuous, vertical indexes of text or images.',
      references: [{
        name: 'Material Design guidelines: Lists',
        url: 'https://material.io/design/components/lists.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-list/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-list/README.md#sass-mixins'},
      ],
      code: `import {MdcListModule} from '@angular-mdc/web/list';`,
      sass: `@use '@material/list/mdc-list';
@use '@material/list';`
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
          header: 'MdcList',
          selectors: [
            'mdc-list',
          ],
          exportedAs: 'mdcList',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'dense: boolean', summary: `Increases the density of the list, making it appear more compact.`},
                {name: 'twoLine: boolean', summary: `Increases the height of the row to give it greater visual separation from adjacent rows.`},
                {name: 'avatar: boolean', summary: `Configures the leading tiles of each row to display images instead of icons. This will make the graphics of the list items larger.`},
                {name: 'border: boolean', summary: `Sets a border around each list item.`},
                {name: 'singleSelection: boolean', summary: `When enabled, the space and enter keys (or click event) will trigger an single list item to become selected and any other previous selected element to become deselected.`},
                {name: 'interactive: boolean', summary: `List items receive styles for hover, focus, and press states (including the ripple). Default is true.`},
                {name: 'useActivatedClass: boolean', summary: `Sets the selection logic to apply/remove the mdc-list-item--activated class.`},
                {name: 'useSelectedClass: boolean', summary: `Sets the selection logic to apply/remove the mdc-list-item--selected class.`},
                {name: 'wrapFocus: boolean', summary: `Sets the list to allow the up arrow on the first element to focus the last element of the list and vice versa.`},
                {name: 'verticalOrientation: boolean', summary: `Sets the list to an orientation causing the keys used for navigation to change. true results in the Up/Down arrow keys being used. If false, the Left/Right arrow keys are used.`},
                {name: 'disableRipple: boolean', summary: `Disables the ripple effect.`},
              ]
            },
            {
              name: 'Methods',
              items: [
                {name: 'setSelectedValue(value: any)', summary: `Sets the currently selected list item by value.`},
                {name: 'setSelectedIndex(index: number)', summary: `Sets the currently selected list item.`},
                {name: 'getSelectedIndex(): number', summary: `Returns the currently selected item index.`},
                {name: 'getSelectedItem(): MdcListItem | undefined', summary: `Returns the currently selected item.`},
                {name: 'focusItemAtIndex(index: number)', summary: `Sets focus to the element at the given index in a list.`},
                {name: 'focusFirstElement()', summary: `Sets focus to the first element in a list.`},
                {name: 'focusLastElement()', summary: `Sets focus to the last element in a list.`},
                {name: 'getListItemByValue(value: any): MdcListItem | undefined', summary: `Returns list item for given value.`},
                {name: 'getListItemByIndex(index: number): MdcListItem | undefined', summary: `Returns list item for given index.`},
                {name: 'getListItemIndexByValue(value: any): number', summary: `Returns the list item index for a given value.`},
                {name: 'reset()', summary: `Clear all activated and selected list item states.`},
              ]
            },
            {
              name: 'Events',
              items: [
                {name: 'selectionChange: MdcListItemChange', summary: `Change event that is being fired whenever the selected state of an option changes.`},
              ]
            },
          ]
        },
        {
          header: 'MdcListItem',
          selectors: [
            'mdc-list-item',
            'a[mdc-list-item]'
          ],
          exportedAs: 'mdcListItem',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'selected: boolean', summary: `Styles the row in an selected state.`},
                {name: 'activated: boolean', summary: `Styles the row in an activated state.`},
                {name: 'disabled: boolean', summary: `Disables the list item.`},
              ]
            },
          ],
        },
        {
          header: 'MdcListItemGraphic',
          summary: 'Optional. The first tile in the row (in LTR languages, the first column of the list item). Typically an icon or image.',
          selectors: [
            'mdcListItemGraphic',
          ],
          exportedAs: 'mdcListItemGraphic',
        },
        {
          header: 'MdcListItemMeta',
          summary: 'Optional. The last tile in the row (in LTR languages, the last column of the list item). Typically small text, icon. or image.',
          selectors: [
            'mdcListItemMeta',
          ],
          exportedAs: 'mdcListItemMeta',
        },
        {
          header: 'MdcListItemText',
          summary: 'Mandatory. Wrapper for list item text content (displayed as middle column of the list item).',
          selectors: [
            'mdc-list-item-text',
            'mdcListItemText'
          ],
          exportedAs: 'mdcListItemText',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'secondaryText: string', summary: `Optional secondary text for the list item. Displayed below the primary text.`},
              ]
            },
          ],
        },
        {
          header: 'MdcListItemSecondary',
          summary: 'Optional. Secondary text for the list item. Displayed below the primary text. Should be the child of mdc-list-item-text.',
          selectors: [
            'mdc-list-item-secondary',
            'mdcListItemSecondary'
          ],
          exportedAs: 'mdcListItemSecondary',
        },
        {
          header: 'MdcListGroup',
          summary: 'Optional. Wrapper around two or more mdc-list elements to be grouped together.',
          selectors: [
            'mdc-list-group',
          ],
          exportedAs: 'mdcListGroup',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'subheader: string', summary: `Optional, heading text displayed above each list in a group.`},
              ]
            },
          ],
        },
        {
          header: 'MdcListGroupSubheader',
          summary: 'Optional. Heading text displayed above each list in a group.',
          selectors: [
            'mdc-list-group-subheader',
            'mdcListGroupSubheader'
          ],
          exportedAs: 'mdcListGroupSubheader',
        },
        {
          header: 'MdcListDivider',
          summary: 'Optional, for list divider element.',
          selectors: [
            'mdc-list-divider',
            'mdcListDivider'
          ],
          exportedAs: 'mdcListDivider',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'inset: boolean', summary: `Increases the leading margin of the divider so that it does not intersect the avatar column.`},
                {name: 'padded: boolean', summary: `To make a divider match the padding of list items.`},
              ]
            },
          ],
        },
      ]
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  items = [
    {label: 'Wi-Fi', icon: 'network_wifi'},
    {label: 'Bluetooth', icon: 'bluetooth'},
    {label: 'Data Usage', icon: 'data_usage'}
  ];

  folders = [
    {name: 'Photos', icon: 'folder', addDate: 'Jan 9, 2015'},
    {name: 'Recipes', icon: 'folder', addDate: 'Jan 17, 2015'},
    {name: 'Work', icon: 'folder', addDate: 'Jan 28, 2015'}
  ];

  files = [
    {name: 'Vacation Itinerary', icon: 'insert_drive_file', addDate: 'Jan 10, 2015'},
    {name: 'Kitchen Remodel', icon: 'insert_drive_file', addDate: 'Jan 20, 2015'}
  ];

  //
  // Examples
  //

  exampleItemsArray = `items = [
  { label: 'Wi-Fi', icon: 'network_wifi'},
  { label: 'Bluetooth', icon: 'bluetooth'},
  { label: 'Data Usage', icon: 'data_usage'}
];`;

  exampleCustom = {
    html: `<mdc-list-group subheader="Folders">
  <mdc-list twoLine avatar class="demo-list--custom">
    <mdc-list-item *ngFor="let folder of folders">
      <mdc-icon mdcListItemGraphic>{{folder.icon}}</mdc-icon>
      <mdc-list-item-text [secondaryText]="folder.addDate">{{folder.name}}</mdc-list-item-text>
      <a href="#/list-demo/examples" mdcListItemMeta mdcIcon aria-label="View more" title="More info">info</a>
    </mdc-list-item>
    <mdc-list-divider inset></mdc-list-divider>
    <h3 mdcListGroupSubheader>Files</h3>
    <mdc-list-item *ngFor="let file of files">
      <mdc-icon mdcListItemGraphic>{{file.icon}}</mdc-icon>
      <mdc-list-item-text [secondaryText]="file.addDate">{{file.name}}</mdc-list-item-text>
      <a href="#/list-demo/examples" mdcListItemMeta mdcIcon aria-label="View more" title="More info">info</a>
    </mdc-list-item>
  </mdc-list>
</mdc-list-group>`,
    ts: `folders = [
  { name: 'Photos', icon: 'folder', addDate: 'Jan 9, 2015' },
  { name: 'Recipes', icon: 'folder', addDate: 'Jan 17, 2015' },
  { name: 'Work', icon: 'folder', addDate: 'Jan 28, 2015' }
];

files = [
  { name: 'Vacation Itinerary', icon: 'insert_drive_file', addDate: 'Jan 10, 2015' },
  { name: 'Kitchen Remodel', icon: 'insert_drive_file', addDate: 'Jan 20, 2015' }
];`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_list.scss`
  };

  exampleSingleLine = {
    html: `<mdc-list>
  <mdc-list-item>Single-line item</mdc-list-item>
  <mdc-list-item>Single-line item</mdc-list-item>
  <mdc-list-item disabled>Single-line item (disabled)</mdc-list-item>
  <mdc-list-item>Single-line item</mdc-list-item>
</mdc-list>`
  };

  exampleTwoLine = {
    html: `<mdc-list twoLine>
  <mdc-list-item>
    <mdc-list-item-text secondaryText="Secondary text">Single-line item</mdc-list-item-text>
  </mdc-list-item>
  <mdc-list-item>
    <mdc-list-item-text secondaryText="Secondary text">Single-line item</mdc-list-item-text>
  </mdc-list-item>
  <mdc-list-item>
    <mdc-list-item-text secondaryText="Secondary text">Single-line item</mdc-list-item-text>
  </mdc-list-item>
</mdc-list>`
  };

  exampleLeadingIcon = {
    html: `<mdc-list>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>network_wifi</mdc-icon>Wi-Fi
  </mdc-list-item>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>bluetooth</mdc-icon>Bluetooth
  </mdc-list-item>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>data_usage</mdc-icon>Data Usage
  </mdc-list-item>
</mdc-list>`
  };

  exampleTrailingIcon = {
    html: `<mdc-list>
  <mdc-list-item>Wi-Fi
    <mdc-icon mdcListItemMeta>info</mdc-icon>
  </mdc-list-item>
  <mdc-list-item>Bluetooth
    <mdc-icon mdcListItemMeta>info</mdc-icon>
  </mdc-list-item>
  <mdc-list-item>Data Usage
    <mdc-icon mdcListItemMeta>info</mdc-icon>
  </mdc-list-item>
</mdc-list>`
  };

  exampleLeadingAndTrailingIcon = {
    html: `<mdc-list>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>network_wifi</mdc-icon>Wi-Fi
    <mdc-icon mdcListItemMeta>info</mdc-icon>
  </mdc-list-item>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>bluetooth</mdc-icon>Bluetooth
    <mdc-icon mdcListItemMeta>info</mdc-icon>
  </mdc-list-item>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>data_usage</mdc-icon>Data Usage
    <mdc-icon mdcListItemMeta>info</mdc-icon>
  </mdc-list-item>
</mdc-list>`
  };

  exampleCheckListLeading = {
    html: `<mdc-list>
  <mdc-list-item>
    <mdc-checkbox></mdc-checkbox>
    Single-line item
  </mdc-list-item>
  <mdc-list-item>
    <mdc-checkbox></mdc-checkbox>
    Single-line item
  </mdc-list-item>
  <mdc-list-item>
    <mdc-checkbox></mdc-checkbox>
    Single-line item
  </mdc-list-item>
</mdc-list>`
  };

  exampleCheckListTrailing = {
    html: `<mdc-list>
  <mdc-list-item>
    Single-line item
    <mdc-checkbox mdcListItemMeta></mdc-checkbox>
  </mdc-list-item>
  <mdc-list-item>
    Single-line item
    <mdc-checkbox mdcListItemMeta></mdc-checkbox>
  </mdc-list-item>
  <mdc-list-item>
    Single-line item
    <mdc-checkbox mdcListItemMeta></mdc-checkbox>
  </mdc-list-item>
</mdc-list>`
  };

  exampleAvatars = {
    html: `<mdc-list avatar>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>person</mdc-icon>Single-line item
  </mdc-list-item>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>person</mdc-icon>Single-line item
  </mdc-list-item>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>person</mdc-icon>Single-line item
  </mdc-list-item>
</mdc-list>`
  };

  exampleGroupLists = {
    html: `<mdc-list-group subheader="First Group">
  <mdc-list>
    <mdc-list-item>
      <mdc-icon mdcListItemGraphic>network_wifi</mdc-icon>Wi-Fi
      <mdc-icon mdcListItemMeta>info</mdc-icon>
    </mdc-list-item>
    <mdc-list-item>
      <mdc-icon mdcListItemGraphic>bluetooth</mdc-icon>Bluetooth
      <mdc-icon mdcListItemMeta>info</mdc-icon>
    </mdc-list-item>
    <mdc-list-item>
      <mdc-icon mdcListItemGraphic>data_usage</mdc-icon>Data Usage
      <mdc-icon mdcListItemMeta>info</mdc-icon>
    </mdc-list-item>
  </mdc-list>
  <mdc-list-divider></mdc-list-divider>
  <h3 mdcListGroupSubheader>Second Group</h3>
  <mdc-list avatar>
    <mdc-list-item>
      <mdc-icon mdcListItemGraphic>person</mdc-icon>Single-line item
    </mdc-list-item>
    <mdc-list-item>
      <mdc-icon mdcListItemGraphic>person</mdc-icon>Single-line item
    </mdc-list-item>
    <mdc-list-item>
      <mdc-icon mdcListItemGraphic>person</mdc-icon>Single-line item
    </mdc-list-item>
  </mdc-list>
</mdc-list-group>`
  };

  exampleShaped = {
    html: `<mdc-list class="demo-list--shaped" singleSelection>
  <mdc-list-item *ngFor="let item of items">
    <mdc-icon mdcListItemGraphic>{{item.icon}}</mdc-icon>
    {{item.label}}
  </mdc-list-item>
</mdc-list>`,
    ts: this.exampleItemsArray,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_list.scss`
  };

  exampleRippleDisabled = {
    html: `<mdc-list disableRipple>
  <mdc-list-item *ngFor="let item of items">
    <mdc-icon mdcListItemGraphic>{{item.icon}}</mdc-icon>
    {{item.label}}
  </mdc-list-item>
</mdc-list>`,
    ts: this.exampleItemsArray
  };

  exampleTwoLineLeadingTrailing = {
    html: `<mdc-list avatar twoLine>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>folder</mdc-icon>
    <mdc-list-item-text secondaryText="Secondary text">Single-line item</mdc-list-item-text>
    <mdc-icon mdcListItemMeta>info</mdc-icon>
  </mdc-list-item>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>folder</mdc-icon>
    <mdc-list-item-text secondaryText="Secondary text">Single-line item</mdc-list-item-text>
    <mdc-icon mdcListItemMeta>info</mdc-icon>
  </mdc-list-item>
  <mdc-list-item>
    <mdc-icon mdcListItemGraphic>folder</mdc-icon>
    <mdc-list-item-text secondaryText="Secondary text">Single-line item</mdc-list-item-text>
    <mdc-icon mdcListItemMeta>info</mdc-icon>
  </mdc-list-item>
</mdc-list>`
  };
}

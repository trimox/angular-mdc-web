import {Component, OnInit, ViewChild} from '@angular/core';

import {ComponentViewer, ComponentApi} from '../../shared/component-viewer';

@Component({template: '<component-api></component-api>'})
export class Api implements OnInit {
  @ViewChild(ComponentApi, {static: true}) _componentApi: ComponentApi;

  ngOnInit() {
    this._componentApi.docApi = {
      sections: [
        {
          header: 'MdcCard',
          selectors: [
            'mdc-card',
          ],
          exportedAs: 'mdcCard',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'outlined: boolean', summary: `Removes the shadow and displays a hairline stroke instead.`},
              ]
            },
          ]
        },
        {
          header: 'MdcCardPrimaryAction',
          summary: `Optional. The main tappable area of the card. Typically contains most (or all) card content except mdc-card-actions. Only applicable to cards that have a primary action that the main surface should trigger.`,
          selectors: [
            'mdc-card-primary-action',
            'mdcCardPrimaryAction',
          ],
          exportedAs: 'mdcCardPrimaryAction',
        },
        {
          header: 'MdcCardMedia',
          selectors: [
            'mdc-card-media',
          ],
          exportedAs: 'mdcCardMedia',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'square: boolean', summary: `Automatically scales the media area's height to equal its width.`},
                {name: 'wide: boolean', summary: `Automatically scales the media area's height according to its width, maintaining a 16:9 aspect ratio.`},
              ]
            },
          ]
        },
        {
          header: 'MdcCardMediaContent',
          summary: `Optional. An absolutely-positioned box the same size as the media area, for displaying a title or icon on top of the background-image.`,
          selectors: [
            'mdc-card-media-content',
            'mdcCardMediaContent',
          ],
          exportedAs: 'mdcCardMediaContent',
        },
        {
          header: 'MdcCardActions',
          selectors: [
            'mdc-card-actions',
          ],
          exportedAs: 'mdcCardActions',
          categories: [
            {
              name: 'Properties',
              items: [
                {name: 'fullBleed: boolean', summary: `Removes the action area's padding and causes its only child (an mdc-card__action element) to consume 100% of the action area's width.`},
              ]
            },
          ]
        },
        {
          header: 'MdcCardActionIcons',
          summary: `Optional. A group of supplemental action icons, displayed on the right side of the card (in LTR).`,
          selectors: [
            'mdc-card-action-icons',
            'mdcCardActionIcons',
          ],
          exportedAs: 'mdcCardActionIcons',
        },
        {
          header: 'MdcCardActionButtons',
          summary: `Optional. A group of action buttons, displayed on the left side of the card (in LTR).`,
          selectors: [
            'mdc-card-action-buttons',
            'mdcCardActionButtons',
          ],
          exportedAs: 'mdcCardActionButtons',
        },
        {
          header: 'MdcCardAction',
          summary: `Optional. An individual action button or icon.`,
          selectors: [
            'mdcCardAction="icon"',
            'mdcCardAction="button"',
          ],
          exportedAs: 'mdcCardAction',
        },
      ]
    };
  }
}

@Component({template: '<component-viewer></component-viewer>'})
export class Card implements OnInit {
  @ViewChild(ComponentViewer, {static: true}) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.template = {
      title: 'Card',
      description: 'Cards contain content and actions about a single subject.',
      references: [{
        name: 'Material Design guidelines: Cards',
        url: 'https://material.io/design/components/cards.html'
      }, {
        name: 'Material Components Web',
        url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-card/README.md'
      }],
      mdcUrls: [
        {name: 'Sass Mixins', url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-card/README.md#sass-mixins'},
      ],
      code: `import {MdcCardModule} from '@angular-mdc/web/card';`,
      sass: `@use '@material/card/mdc-card';
@use '@material/card';`
    };
  }
}

@Component({templateUrl: './examples.html'})
export class Examples {
  example1 = {
    html: `<mdc-card class="demo-card">
  <mdc-card-primary-action>
    <mdc-card-media class="demo-card__media--16-9" wide></mdc-card-media>
    <div class="demo-card__primary">
      <h2 class="demo-card__title" mdcHeadline6>Our Changing Planet</h2>
      <h3 class="demo-card__subtitle" mdcSubtitle2>by Kurt Wagner</h3>
    </div>
    <div class="demo-card__secondary" mdcBody2>
      Visit ten places on our planet that are undergoing the biggest changes today.
    </div>
  </mdc-card-primary-action>
  <mdc-card-actions>
    <mdc-card-action-buttons>
      <button mdc-button mdcCardAction="button">Read</button>
      <button mdc-button mdcCardAction="button">Bookmark</button>
    </mdc-card-action-buttons>
    <mdc-card-action-icons>
      <button mdcIconButton mdcCardAction="icon" onIcon="favorite" offIcon="favorite_border"></button>
      <button mdcIconButton mdcCardAction="icon" icon="share"></button>
      <button mdcIconButton mdcCardAction="icon" icon="more_vert"></button>
    </mdc-card-action-icons>
  </mdc-card-actions>
</mdc-card>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_card.scss`
  };

  example2 = {
    html: `<mdc-card class="demo-card" outlined>
  <div class="demo-card-article-group-heading" mdcSubtitle2>Headlines</div>
  <mdc-list-divider></mdc-list-divider>
  <mdc-ripple class="demo-card-article">
    <h2 class="demo-card-article__title" mdcHeadline5>Copper on the rise</h2>
    <p class="demo-card-article__snippet" mdcBody2>
      Copper price soars amid global market optimism and increased demand.
    </p>
  </mdc-ripple>
  <mdc-list-divider></mdc-list-divider>
  <mdc-ripple class="demo-card-article">
    <h2 class="demo-card-article__title" mdcHeadline5>U.S. tech startups rebound</h2>
    <p class="demo-card-article__snippet" mdcBody2>
      Favorable business conditions have allowed startups to secure more fundraising deals compared to last year.
    </p>
  </mdc-ripple>
  <mdc-list-divider></mdc-list-divider>
  <mdc-ripple class="demo-card-article">
    <h2 class="demo-card-article__title" mdcHeadline5>Asia's clean energy ambitions</h2>
    <p class="demo-card-article__snippet" mdcBody2>
      China plans to invest billions of dollars for the development of over 300 clean energy projects in Southeast
      Asia.
    </p>
  </mdc-ripple>
  <mdc-list-divider></mdc-list-divider>
  <mdc-card-actions fullBleed>
    <button mdc-button mdcCardAction="button">
      All Business Headlines
      <mdc-icon>arrow_forward</mdc-icon>
    </button>
  </mdc-card-actions>
</mdc-card>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_card.scss`
  };

  example3 = {
    html: `<mdc-card class="demo-card demo-card--photo">
  <mdc-card-primary-action>
    <mdc-card-media square class="demo-card__media">
      <mdc-card-media-content class="demo-card__media-content--with-title">
        <div class="demo-card__media-title" mdcSubtitle2>Vacation Photos</div>
      </mdc-card-media-content>
    </mdc-card-media>
  </mdc-card-primary-action>
  <mdc-card-actions>
    <mdc-card-action-icons>
      <button mdcIconButton mdcCardAction="icon" onIcon="favorite" offIcon="favorite_border"></button>
      <button mdcIconButton mdcCardAction="icon" onIcon="bookmark" offIcon="bookmark_border"></button>
      <button mdcIconButton mdcCardAction="icon" icon="share"></button>
    </mdc-card-action-icons>
  </mdc-card-actions>
</mdc-card>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_card.scss`
  };

  example4 = {
    html: `<mdc-card class="demo-card demo-card--music">
  <mdc-card-primary-action>
    <div class="demo-card__music-row">
      <mdc-card-media square class="demo-card__media demo-card__media--music"></mdc-card-media>
      <div class="demo-card__music-info">
        <div class="demo-card__music-title" mdcHeadline5>Title</div>
        <div class="demo-card__music-artist" mdcBody2>Under the Grave</div>
        <div class="demo-card__music-year" mdcBody2>(2016)</div>
      </div>
    </div>
  </mdc-card-primary-action>
  <mdc-list-divider></mdc-list-divider>
  <mdc-card-actions>
    <mdc-card-action-buttons class="demo-card__action-buttons--text-only">Rate album</mdc-card-action-buttons>
    <mdc-card-action-icons>
      <button mdcIconButton mdcCardAction="icon" onIcon="star"
        offIcon="star_border">
      </button>
      <button mdcIconButton mdcCardAction="icon" onIcon="star"
        offIcon="star_border">
      </button>
      <button mdcIconButton mdcCardAction="icon" onIcon="star"
        offIcon="star_border">
      </button>
      <button mdcIconButton mdcCardAction="icon" onIcon="star"
        offIcon="star_border">
      </button>
      <button mdcIconButton mdcCardAction="icon" onIcon="star"
        offIcon="star_border">
      </button>
      </mdc-card-action-icons>
  </mdc-card-actions>
</mdc-card>`,
    sass: `https://raw.githubusercontent.com/trimox/angular-mdc-web/master/demos/src/styles/_card.scss`
  };
}

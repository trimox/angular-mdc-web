import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentViewer, ComponentView } from '../../shared/component-viewer';

@Component({ templateUrl: './api.html' })
export class Api { }

@Component({ templateUrl: './sass.html' })
export class Sass { }

@Component({ template: '<component-viewer></component-viewer>' })
export class CardDemo implements OnInit {
  @ViewChild(ComponentViewer) _componentViewer: ComponentViewer;

  ngOnInit(): void {
    this._componentViewer.componentView = new ComponentView(
      'Card',
      'Cards contain content and actions about a single subject.',
      "import { MdcCardModule } from '@angular-mdc/web';");

    this._componentViewer.componentView.references = [{
      name: 'Material Design guidelines: Cards',
      url: 'https://material.io/design/components/cards.html'
    }, {
      name: 'Material Components Web',
      url: 'https://github.com/material-components/material-components-web/blob/master/packages/mdc-card/README.md'
    }];
  }
}

@Component({ templateUrl: './examples.html' })
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
      <button mdcIconButton mdcCardAction="icon">
        <mdc-icon mdcIconOn>favorite</mdc-icon>
        <mdc-icon>favorite_border</mdc-icon>
      </button>
      <button mdcIconButton mdcCardAction="icon" icon="share"></button>
      <button mdcIconButton mdcCardAction="icon" icon="more_vert"></button>
    </mdc-card-action-icons>
  </mdc-card-actions>
</mdc-card>`,
    sass: `.demo-card {
  width: 350px;
  margin: 28px;
}

.demo-card__primary {
  padding: 1rem;
}

.demo-card__title {
  margin: 0;
}

.demo-card__subtitle {
  @include mdc-theme-prop(color, text-secondary-on-background);

  margin: 0;
}

.demo-card__secondary {
  @include mdc-theme-prop(color, text-secondary-on-background);

  padding: 0 1rem 8px 1rem;
}

.demo-card__media--16-9 {
  background-image: url(https://material-components-web.appspot.com/images/16-9.jpg);
}`
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
    sass: `.demo-card {
  width: 350px;
  margin: 28px;
}

.demo-card-article {
  padding: 16px;
  text-decoration: none;
  color: inherit;
}

.demo-card-article-group-heading {
  @include mdc-theme-prop(color, text-secondary-on-light);

  padding: 8px 16px;
}

.demo-card-article__title {
  margin: 0 0 4px 0;
}

.demo-card-article__snippet {
  @include mdc-theme-prop(color, text-secondary-on-light);

  margin: 0;
}`
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
      <button mdcIconButton mdcCardAction="icon">
        <mdc-icon mdcIconOn>favorite</mdc-icon>
        <mdc-icon>favorite_border</mdc-icon>
      </button>
      <button mdcIconButton mdcCardAction="icon">
        <mdc-icon mdcIconOn>bookmark</mdc-icon>
        <mdc-icon>bookmark_border</mdc-icon>
      </button>
      <button mdcIconButton mdcCardAction="icon" icon="share"></button>
    </mdc-card-action-icons>
  </mdc-card-actions>
</mdc-card>`,
    sass: `.demo-card {
  width: 350px;
  margin: 28px;
}

.demo-card--photo {
  width: 200px;
}

.demo-card__media {
  background-image: url(https://material-components-web.appspot.com/images/1-1.jpg);
}

.demo-card__media-content--with-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.demo-card__media-title {
  padding: 8px 16px;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%);
  color: white;
}`
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
      <button mdcIconButton mdcCardAction="icon">
        <mdc-icon mdcIconOn>star</mdc-icon>
        <mdc-icon>star_border</mdc-icon>
      </button>
      <button mdcIconButton mdcCardAction="icon">
        <mdc-icon mdcIconOn>star</mdc-icon>
        <mdc-icon>star_border</mdc-icon>
      </button>
      <button mdcIconButton mdcCardAction="icon">
        <mdc-icon mdcIconOn>star</mdc-icon>
        <mdc-icon>star_border</mdc-icon>
      </button>
      <button mdcIconButton mdcCardAction="icon">
        <mdc-icon mdcIconOn>star</mdc-icon>
        <mdc-icon>star_border</mdc-icon>
      </button>
      <button mdcIconButton mdcCardAction="icon">
        <mdc-icon mdcIconOn>star</mdc-icon>
        <mdc-icon>star_border</mdc-icon>
      </button>
    </mdc-card-action-icons>
  </mdc-card-actions>
</mdc-card>`,
    sass: `.demo-card {
  width: 350px;
  margin: 28px;
}

.demo-card--music {
  @include mdc-card-shape-radius(24px 4px);

  @include mdc-rtl {
    @include mdc-card-shape-radius(4px 24px);
  }
}

.demo-card__music-row {
  display: flex;
  border-top-left-radius: inherit;

  @include mdc-rtl {
    border-top-left-radius: 0;
    border-top-right-radius: inherit;
  }
}

.demo-card__media--music {
  width: 110px;
  border-top-left-radius: inherit;

  @include mdc-rtl {
    border-top-left-radius: 0;
    border-top-right-radius: inherit;
  }
}

.demo-card__music-info {
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
}

.demo-card__action-buttons--text-only {
  margin-left: 8px;
}`
  };
}

import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({providedIn: 'root'})
export class Platform {
  isBrowser: boolean = this._platformId ?
    isPlatformBrowser(this._platformId) : typeof document === 'object' && !!document;

  constructor(@Inject(PLATFORM_ID) private _platformId?: Object) {}
}

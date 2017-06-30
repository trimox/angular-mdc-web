import { Injectable } from '@angular/core';

@Injectable()
export class Platform {
  isBrowser: boolean = typeof document === 'object' && !!document;
}

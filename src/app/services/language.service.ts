import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage: 'DE' | 'EN' = 'DE';

  constructor() {}

  setLen(len: 'DE' | 'EN') {
    this.currentLanguage = len;
  }

  getLanguage() {
    return this.currentLanguage;
  }
}

import { Injectable } from "@angular/core";

import { TranslateService } from "ng2-translate";

import { AppConstantsService } from "./app-constants.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AppLanguageService {
  protected translate: TranslateService;
  protected appConstantsService: AppConstantsService;
  protected localStorage: LocalStorageService;
  protected selectedLanguageId: string;

  constructor(translate: TranslateService,
              appConstantsService: AppConstantsService,
              localStorageService: LocalStorageService) {
    this.translate = translate;
    this.appConstantsService = appConstantsService;
    this.localStorage = localStorageService;

    this.start();
    this.translate.use(this.getLanguageId());
  }

  public start(): void {
    const localStorageLang = this.localStorage.getData<string>(this.appConstantsService.LocalStorageKey.LANGUAGE_ID);
    const browserLang = this.getBrowserLang();
    const defaultLang = this.getDefaultLanguageId();

    if (localStorageLang && this.appConstantsService.Languages.SUPPORTED_LANG.indexOf(localStorageLang) !== -1) {
      this.selectedLanguageId = localStorageLang;
    } else {
      this.selectedLanguageId = this.appConstantsService.Languages.SUPPORTED_LANG.indexOf(browserLang) === -1 ? defaultLang : browserLang;
      this.localStorage.setData(this.appConstantsService.LocalStorageKey.LANGUAGE_ID, this.selectedLanguageId);
    }
  }

  public getLanguageId(): string {
    return this.selectedLanguageId;
  }

  public setLanguageId(languageId: string): void {
    if (languageId !== undefined && languageId !== this.selectedLanguageId && this.appConstantsService.Languages.SUPPORTED_LANG.indexOf(languageId) !== -1) {
      this.selectedLanguageId = languageId;
      this.localStorage.setData(this.appConstantsService.LocalStorageKey.LANGUAGE_ID, this.selectedLanguageId);
      this.translate.use(languageId);
      location.reload(true);
    }
  }

  public getSupportedLanguagesList(): string[] {
    return this.appConstantsService.Languages.SUPPORTED_LANG;
  }

  public getDefaultLanguageId(): string {
    return this.appConstantsService.Languages.SUPPORTED_LANG[0];
  }

  protected getBrowserLang(): string {
    const browserLanguage = "browserLanguage";
    let lang: string = navigator[browserLanguage];

    if (lang === undefined) {
      lang = navigator.language;
    }

    if (lang.length > 0) {
      lang = lang.toLowerCase();
    }

    if (lang.length > 2) {
      lang = lang.substring(0, 2);
    }

    return lang;
  }
}

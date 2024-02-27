import {
  ApplicationConfig,
  isDevMode,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideTransloco } from '@ngneat/transloco';

import { AppLanguageService, TranslocoHttpLoader } from './core';

import { routes } from './app.routes';

function createLanguageIdLoader(appLanguageService: AppLanguageService): string {
  return appLanguageService.getLanguageId();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideTransloco({
      config: {
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: LOCALE_ID,
      useFactory: (createLanguageIdLoader),
      deps: [AppLanguageService],
    },
  ],
};

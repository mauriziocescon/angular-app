import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { AppLanguageService } from './core';

import { routes } from './app.routes';

import { environment } from '../environments/environment';

function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

function createLanguageIdLoader(appLanguageService: AppLanguageService): string {
  return appLanguageService.getLanguageId();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient],
        },
      }),
    ),
    {
      provide: LOCALE_ID,
      useFactory: (createLanguageIdLoader),
      deps: [AppLanguageService],
    },
    importProvidersFrom(
      LoggerModule.forRoot({
        serverLoggingUrl: environment.logsUrl,
        level: !environment.production ? NgxLoggerLevel.ERROR : NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.LOG,
      }),
    ),
  ],
};

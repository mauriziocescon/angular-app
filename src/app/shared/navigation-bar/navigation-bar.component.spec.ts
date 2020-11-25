import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { CoreModule, AppLanguageService } from '../../core/core.module';

import { NavigationBarComponent } from './navigation-bar.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        NgbModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient],
          },
        }),
        LoggerModule.forRoot({
          serverLoggingUrl: '',
          level: NgxLoggerLevel.OFF,
          serverLogLevel: NgxLoggerLevel.OFF,
        }),
        CoreModule.forRoot(),
      ],
      declarations: [
        NavigationBarComponent,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        TranslateService,
        NGXLogger,
        AppLanguageService,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

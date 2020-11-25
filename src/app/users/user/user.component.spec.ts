import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { User } from '../user.model';

import { UserComponent } from './user.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
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
        SharedModule,
      ],
      declarations: [
        UserComponent,
      ],
      providers: [
        FormBuilder,
        TranslateService,
        NGXLogger,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.user = {} as User;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

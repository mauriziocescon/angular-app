import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { AlbumModule } from './album/album.module';

import { Album } from './album.model';
import { AlbumsComponent } from './albums.component';
import { AlbumsService } from './albums.data-service';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// Stub AlbumsService
class AlbumsStubService {

  getAlbums(textFilter: string | undefined, page: number, limit: number): Observable<{ albums: Album[], lastPage: boolean }> {
    return of({ albums: [], lastPage: true });
  }
}

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

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
        AlbumModule,
      ],
      declarations: [
        AlbumsComponent,
      ],
      providers: [
        FormBuilder,
        TranslateService,
        NGXLogger,
        { provide: AlbumsService, useValue: AlbumsStubService },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
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

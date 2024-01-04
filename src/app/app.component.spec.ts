import { TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { LoggerModule } from 'ngx-logger';

import { NavigationBarComponent } from './shared';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        LoggerModule.forRoot(undefined),
        NavigationBarComponent,
        AppComponent,
      ],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

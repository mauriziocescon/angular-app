import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Http } from "@angular/http";

import { ChartsModule } from "ng2-charts/ng2-charts";
import { TranslateModule, TranslateStaticLoader, TranslateLoader, TranslateService } from "ng2-translate";
import "rxjs/Rx";

import { CoreModule, AppLanguageService } from "../../core/core.module";

import { NavigationBarComponent } from "./navigation-bar.component";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, "assets/i18n/", ".json");
}

describe("NavigationBarComponent", () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ChartsModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http],
        }),
      ],
      declarations: [
        NavigationBarComponent
      ],
      providers: [
        TranslateService,
        {provide: AppLanguageService, useValue: {}}, // todo: Provide a test-double service
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});

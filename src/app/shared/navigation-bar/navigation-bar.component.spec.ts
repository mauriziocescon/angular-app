import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Http } from "@angular/http";

import { ChartsModule } from "ng2-charts/ng2-charts";
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from "ng2-translate";

import { AppConstantsService, AppLanguageService } from "../../core/core.module";

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
        AppConstantsService, // todo: Provide a test-double service {provide: AppConstantsService, useValue: {}}
        AppLanguageService, // todo: Provide a test-double service {provide: AppLanguageService, useValue: {}}
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

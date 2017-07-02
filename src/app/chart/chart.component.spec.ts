import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Http } from "@angular/http";

import { TranslateModule, TranslateStaticLoader, TranslateLoader, TranslateService } from "ng2-translate";

import { CoreModule, AppConstantsService, CsvParserService } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";

import { ChartComponent } from "./chart.component";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, "assets/i18n/", ".json");
}

describe("ChartComponent", () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        SharedModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http],
        }),
      ],
      declarations: [
        ChartComponent,
      ],
      providers: [
        TranslateService,
        {provide: AppConstantsService, useValue: {}}, // Provide a test-double service
        {provide: CsvParserService, useValue: {}}, // Provide a test-double service
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});

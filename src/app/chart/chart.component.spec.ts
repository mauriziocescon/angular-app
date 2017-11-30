import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClient } from "@angular/common/http";

import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { CoreModule, AppConstantsService, CsvParserService } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";

import { ChartComponent } from "./chart.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
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
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        }),
      ],
      declarations: [
        ChartComponent,
      ],
      providers: [
        TranslateService,
        {provide: AppConstantsService, useValue: {}}, // todo: Provide a test-double service
        {provide: CsvParserService, useValue: {}}, // todo: Provide a test-double service
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

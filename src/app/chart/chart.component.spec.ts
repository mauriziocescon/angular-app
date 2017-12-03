import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TranslateService } from "@ngx-translate/core";

import { CoreModule, AppConstantsService, CsvParserService } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";

import { ChartComponent } from "./chart.component";

describe("ChartComponent", () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        ChartComponent,
      ],
      providers: [
        TranslateService,
        AppConstantsService,
        CsvParserService,
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

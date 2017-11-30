import { Component, OnInit } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { AppConstantsService, CsvParserService } from "../core/core.module";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  public barChartData: any;

  protected translate: TranslateService;
  protected appConstants: AppConstantsService;
  protected csvParser: CsvParserService;

  constructor(translateService: TranslateService,
              appConstantsService: AppConstantsService,
              csvParserService: CsvParserService) {
    this.translate = translateService;
    this.appConstants = appConstantsService;
    this.csvParser = csvParserService;
  }

  public ngOnInit(): void {
    this.setupChart();

    // parse a local csv
    // this.csvParser.parse();
  }

  public onSelect(event): void {
    console.log(event);
  }

  protected setupChart(): void {
    this.barChartData = {
      single: [
        {name: "Germany", value: 8940000},
        {name: "USA", value: 5000000},
        {name: "France", value: 7200000},
      ],
      view: [700, 400],
      showXAxis: true,
      showYAxis: true,
    };
  }
}

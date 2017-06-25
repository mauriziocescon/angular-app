import { Component, OnInit } from "@angular/core";

import { TranslateService } from "ng2-translate";

import { AppConstantsService, CsvParserService } from "../core/core.module";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  public title: string;
  public barChartOptions: any;
  public barChartLabels: string[];
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData: any[];

  protected translate: TranslateService;
  protected appConstants: AppConstantsService;
  protected csvParser: CsvParserService;

  constructor(TranslateService: TranslateService,
              AppConstantsService: AppConstantsService,
              CsvParserService: CsvParserService) {
    this.translate = TranslateService;
    this.appConstants = AppConstantsService;
    this.csvParser = CsvParserService;
  }

  public ngOnInit(): void {

    this.translate.get("DESCRIPTION")
      .subscribe((res: string) => {
        this.title = res;
      });

    this.setupChart();

    // this.csvParser.parse();
  }

  protected setupChart(): void {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            tickMarkLength: 15,
          },
          ticks: {
            autoSkip: false,
          },
        }],
        yAxes: [{
          gridLines: {
            tickMarkLength: 15,
          },
          ticks: {
            fontSize: 12,
            padding: 5,
            suggestedMin: 0,
            suggestedMax: 1000,
          },
        }],
      },
    };
    this.barChartLabels = ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"];
    this.barChartType = "bar";
    this.barChartLegend = true;

    this.barChartData = [
      {data: [200, 500, 600, 780, 856, 700, 600, 550, 300, 180], label: "Series A"},
      {data: [208, 500, 400, 190, 806, 207, 900, 100, 200, 10], label: "Series B"},
    ];
  }
}

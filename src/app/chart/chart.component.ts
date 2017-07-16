import { Component, OnInit } from "@angular/core";

import { TranslateService } from "ng2-translate";

import { AppConstantsService, CsvParserService } from "../core/core.module";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  public barChartOptions: any;
  public barChartLabels: string[];
  public colors: any[];
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData: any[];

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
    this.colors = [
      {
        backgroundColor: "rgba(255,0,0,0.2)",
        borderColor: "rgba(255,0,0,0,1)",
        pointBackgroundColor: "rgba(255,0,0,0,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,0,0,0,0.8)",
      },
      {
        backgroundColor: "rgba(232,185,12,0.2)",
        borderColor: "rgba(232,185,12,1)",
        pointBackgroundColor: "rgba(232,185,12,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(232,185,12,0.8)",
      }];

    this.barChartData = [
      {
        data: [200, 500, 600, 780, 856, 700, 600, 550, 300, 180],
        label: "Series A",
      },
      {
        data: [208, 500, 400, 190, 806, 207, 900, 100, 200, 10],
        label: "Series B",
      },
    ];
  }
}

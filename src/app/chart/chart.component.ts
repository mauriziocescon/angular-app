import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';

import { AppConstantsService } from '../core/core.module';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  barChartData: any;

  constructor(protected decimalPipe: DecimalPipe,
              protected translate: TranslateService,
              protected logger: NGXLogger,
              protected appConstants: AppConstantsService) {
  }

  ngOnInit(): void {
    this.setupChart();
  }

  onSelect(event: any): void {
    this.logger.log(event);
  }

  protected setupChart(): void {


    this.barChartData = {
      data: [
        { name: 'Germany', value: 4500.787 },
        { name: 'USA', value: 5000.782 },
        { name: 'France', value: 7200.021 },
      ],
      xAxisTickFormatting: (value: number) => {
        return this.decimalPipe.transform(value, '1.0-2');
      },
      colorScheme: {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
      },
      showXAxis: true,
      showYAxis: true,
      showLegend: true,
    };
  }
}

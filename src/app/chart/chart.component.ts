import { Component, OnInit } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    NgxChartsModule,
  ],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="chart">
            <ngx-charts-bar-horizontal
              [scheme]="barChartData.colorScheme"
              [results]="barChartData.data"
              [xAxis]="barChartData.showXAxis"
              [yAxis]="barChartData.showYAxis"
              [legend]="barChartData.showLegend"
              [showXAxisLabel]="barChartData.showXAxisLabel"
              [showYAxisLabel]="barChartData.showYAxisLabel"
              [xAxisLabel]="barChartData.xAxisLabel"
              [yAxisLabel]="barChartData.yAxisLabel"
              [xAxisTickFormatting]="barChartData.xAxisTickFormatting"
              (select)="onSelect($event)">
              <ng-template #tooltipTemplate let-model="model">
                <h6>{{ model.name }}</h6>
                <h5>{{ model.value | number }}</h5>
              </ng-template>
            </ngx-charts-bar-horizontal>
          </div>
        </div>
      </div>
    </div>`,
  styles: [`
    .chart {
      height: 200px;
    }
  `],
})
export class ChartComponent implements OnInit {
  barChartData: any;

  ngOnInit(): void {
    this.setupChart();
  }

  onSelect(event: any): void {
  }

  protected setupChart(): void {
    this.barChartData = {
      data: [
        { name: 'Germany', value: 4500.787 },
        { name: 'USA', value: 5000.782 },
        { name: 'France', value: 7200.021 },
      ],
      colorScheme: {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
      },
      showXAxis: true,
      showYAxis: true,
      showLegend: true,
    };
  }
}

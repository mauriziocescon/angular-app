import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ChartComponent } from "./chart.component";

export const chartRoutes: Routes = [
  {
    path: "chart",
    component: ChartComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(chartRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ChartRoutingModule {
}

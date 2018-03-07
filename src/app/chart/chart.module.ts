import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { ChartRoutingModule } from "./chart-routing.module";

import { ChartComponent } from "./chart.component";

@NgModule({
  imports: [
    SharedModule,
    ChartRoutingModule,
  ],
  declarations: [
    ChartComponent,
  ],
  exports: [],
  providers: [],
})
export class ChartModule {
}

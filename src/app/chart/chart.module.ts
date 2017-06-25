import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { ChartComponent } from "./chart.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ChartComponent,
  ],
  exports: [],
  providers: [],
})
export class ChartModule {
}

export {
  ChartComponent
};

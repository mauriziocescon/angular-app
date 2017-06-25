import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ChartsModule } from "ng2-charts/ng2-charts";
import { TranslateModule } from "ng2-translate";

import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    TranslateModule,
  ],
  declarations: [
    NavigationBarComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    TranslateModule,
    NavigationBarComponent,
  ],
})
export class SharedModule {
}

export {};

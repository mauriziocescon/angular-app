import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ChartsModule } from "ng2-charts/ng2-charts";
import { TranslateModule } from "ng2-translate";

import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { Enum } from "./utilities/enum";
import { KeyValue } from "./utilities/keyvalue";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    TranslateModule,
  ],
  declarations: [
    NavigationBarComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    TranslateModule,
    NavigationBarComponent,
  ],
})
export class SharedModule {
}

export {
  Enum,
  KeyValue
};

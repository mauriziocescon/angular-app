import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { ChartsModule } from "ng2-charts/ng2-charts";
import { TranslateModule } from "@ngx-translate/core";

import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { Enum } from "./utilities/enum";
import { KeyValue } from "./utilities/keyvalue";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
  NavigationBarComponent,
  Enum,
  KeyValue
};

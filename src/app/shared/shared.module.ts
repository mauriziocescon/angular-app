import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgxChartsModule } from "@swimlane/ngx-charts";
import { TranslateModule } from "@ngx-translate/core";

import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { Enum } from "./utilities/enum";
import { KeyValue } from "./utilities/keyvalue";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    TranslateModule,
  ],
  declarations: [
    NavigationBarComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule,
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

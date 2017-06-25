import { NgModule, Optional, SkipSelf, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppConstantsService } from "./services/app-constants.service";
import { CsvParserService } from "./services/csv-parser.service";
import { UtilitiesService } from "./services/utilities.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: []
})
export class CoreModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AppConstantsService,
        CsvParserService,
        UtilitiesService
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only");
    }
  }
}

export {
  AppConstantsService,
  CsvParserService,
  UtilitiesService
};

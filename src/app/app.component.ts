import { Component, OnDestroy, OnInit } from "@angular/core";

import { TranslateService } from "ng2-translate";

import { AppConstantsService } from "./core/core.module";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  protected translate: TranslateService;
  protected appConstants: AppConstantsService;

  constructor(TranslateService: TranslateService,
              AppConstantsService: AppConstantsService) {
    this.translate = TranslateService;
    this.appConstants = AppConstantsService;

    this.translate.setDefaultLang(this.appConstants.Languages.DEFAULT_LANGUAGE);
    this.translate.use(this.appConstants.Languages.DEFAULT_LANGUAGE);
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }
}

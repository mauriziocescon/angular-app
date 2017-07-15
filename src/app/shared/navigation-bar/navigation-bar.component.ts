import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { TranslateService } from "ng2-translate";

import { AppConstantsService } from "../../core/core.module";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class NavigationBarComponent implements OnInit {

  public languages: string[];
  public selectedLanguageId: string;

  protected router: Router;
  protected translate: TranslateService;
  protected appConstants: AppConstantsService;

  constructor(router: Router,
              translateService: TranslateService,
              appConstantsService: AppConstantsService) {
    this.router = router;
    this.translate = translateService;
    this.appConstants = appConstantsService;
  }

  public ngOnInit(): void {
    this.selectedLanguageId = this.appConstants.Languages.DEFAULT_LANGUAGE;
    this.languages = this.appConstants.Languages.SUPPORTED_LANG;
  }

  public selectLanguage(language: string): void {
    this.selectedLanguageId = language;
    this.translate.use(this.selectedLanguageId);
  }

  public goToUsers(): void {
    this.router.navigate(["/users"]);
  }

  public goToCharts(): void {
    this.router.navigate(["/chart"]);
  }
}

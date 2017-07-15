import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
  protected appConstants: AppConstantsService;

  constructor(router: Router,
              AppConstantsService: AppConstantsService) {
    this.router = router;
    this.appConstants = AppConstantsService;
  }

  public ngOnInit(): void {
    this.selectedLanguageId = this.appConstants.Languages.DEFAULT_LANGUAGE;
    this.languages = this.appConstants.Languages.SUPPORTED_LANG;
  }

  public selectLanguage(language: string): void {
    this.selectedLanguageId = language;
  }

  public goToUsers(): void {
    this.router.navigate(["/users"]);
  }

  public goToCharts(): void {
    this.router.navigate(["/chart"]);
  }
}

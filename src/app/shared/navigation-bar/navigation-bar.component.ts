import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AppConstantsService } from "../../core/core.module";
import { AppLanguageService } from "../../core/services/app-language.service";

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
  protected appLanguage: AppLanguageService;

  constructor(router: Router,
              appConstantsService: AppConstantsService,
              appLanguageService: AppLanguageService) {
    this.router = router;
    this.appLanguage = appLanguageService;
    this.appConstants = appConstantsService;
  }

  public ngOnInit(): void {
    this.languages = this.appLanguage.getSupportedLanguagesList();
    this.selectedLanguageId = this.appLanguage.getLanguageId();
  }

  public selectLanguage(language: string): void {
    if (this.appLanguage.getLanguageId() !== language) {
      this.selectedLanguageId = language;
      this.appLanguage.setLanguageId(this.selectedLanguageId);
    }
  }

  public goToUsers(): void {
    this.router.navigate(["/users"]);
  }

  public goToCharts(): void {
    this.router.navigate(["/chart"]);
  }
}

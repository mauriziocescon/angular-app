import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppConstantsService, AppLanguageService } from '../../core/core.module';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  languages: string[];
  selectedLanguageId: string;
  isCollapsed: boolean;

  constructor(protected router: Router,
              protected appConstants: AppConstantsService,
              protected appLanguage: AppLanguageService) {
  }

  get canOpenJsonServer(): boolean {
    return this.appConstants.Application.SHOW_JSON_SERVER_API === true;
  }

  ngOnInit(): void {
    this.languages = this.appLanguage.getSupportedLanguagesList();
    this.selectedLanguageId = this.appLanguage.getLanguageId();
    this.isCollapsed = true;
  }

  selectLanguage(language: string): void {
    if (this.appLanguage.getLanguageId() !== language) {
      this.selectedLanguageId = language;
      this.appLanguage.setLanguageId(this.selectedLanguageId);
    }
  }

  goToAlbums(): void {
    this.router.navigate(['/albums']);
  }

  goToUsers(): void {
    this.router.navigate(['/users']);
  }

  goToCharts(): void {
    this.router.navigate(['/chart']);
  }

  openJsonServer(): void {
    window.open(this.appConstants.Application.JSON_SERVER_API_URL);
  }
}

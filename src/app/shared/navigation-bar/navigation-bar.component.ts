import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppLanguageService } from '../../core/core.module';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  languages: string[];
  selectedLanguageId: string;

  constructor(protected router: Router,
              protected appLanguage: AppLanguageService) {
  }

  ngOnInit(): void {
    this.languages = this.appLanguage.getSupportedLanguagesList();
    this.selectedLanguageId = this.appLanguage.getLanguageId();
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
}

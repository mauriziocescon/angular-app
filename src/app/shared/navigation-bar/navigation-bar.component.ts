import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppConstantsService, AppLanguageService } from '../../core/core.module';

@Component({
  selector: 'app-navigation-bar',
  template: `
    <nav class="navbar navbar-expand-lg bg-primary navbar-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ "NAVIGATION_BAR.NAME" | translate }}</a>
        <button class="navbar-toggler" type="button" (click)="isCollapsed = !isCollapsed">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" (click)="goToAlbums()">{{ "NAVIGATION_BAR.ALBUMS" | translate }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" (click)="goToUsers()">{{ "NAVIGATION_BAR.USERS" | translate }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" (click)="goToCharts()">{{ "NAVIGATION_BAR.CHARTS" | translate }}</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item" *ngIf="canOpenJsonServer">
              <a class="nav-link" (click)="openJsonServer()"><span class="fas fa-server"></span></a>
            </li>
            <li class="nav-item dropdown" ngbDropdown>
              <a class="nav-link dropdown-toggle" ngbDropdownToggle>{{ selectedLanguageId }}</a>
              <div class="dropdown-menu" ngbDropdownMenu>
                <a class="dropdown-item" *ngFor="let language of languages" (click)="selectLanguage(language)">
                  {{ language }}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>`,
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

import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { TranslocoPipe } from '@ngneat/transloco';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AppConstantsService, AppLanguageService } from '../../core';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    TranslocoPipe,
    NgbCollapseModule,
    NgbDropdownModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="navbar navbar-expand-lg bg-primary navbar-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ "NAVIGATION_BAR.NAME" | transloco }}</a>
        <button class="navbar-toggler" type="button" (click)="toggleCollapsed()">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed()">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" (click)="goToAlbums()">{{ "NAVIGATION_BAR.ALBUMS" | transloco }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" (click)="goToUsers()">{{ "NAVIGATION_BAR.USERS" | transloco }}</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            @if (canOpenJsonServer()) {
              <li class="nav-item">
                <a class="nav-link" (click)="openJsonServer()"><span class="fas fa-server"></span></a>
              </li>
            }
            <li class="nav-item dropdown" ngbDropdown>
              <a class="nav-link dropdown-toggle" ngbDropdownToggle>{{ selectedLanguageId() }}</a>
              <div class="dropdown-menu" ngbDropdownMenu>
                @for (language of languages(); track language) {
                  <a class="dropdown-item" (click)="selectLanguage(language)">
                    {{ language }}
                  </a>
                }
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>`,
})
export class NavigationBarComponent implements OnInit {
  languages = signal<string[]>([]);
  selectedLanguageId = signal<string | undefined>(undefined);
  isCollapsed = signal<boolean>(false);
  canOpenJsonServer = signal<boolean>(false);

  private router = inject(Router);
  private appConstants = inject(AppConstantsService);
  private appLanguage = inject(AppLanguageService);

  ngOnInit(): void {
    this.languages.set(this.appLanguage.getSupportedLanguagesList());
    this.selectedLanguageId.set(this.appLanguage.getLanguageId());
    this.isCollapsed.set(true);
    this.canOpenJsonServer.set(this.appConstants.Application.SHOW_JSON_SERVER_API === true);
  }

  selectLanguage(language: string): void {
    if (this.appLanguage.getLanguageId() !== language) {
      this.selectedLanguageId.set(language);
      this.appLanguage.setLanguageId(this.selectedLanguageId());
    }
  }

  toggleCollapsed(): void {
    this.isCollapsed.update(v => !v);
  }

  goToAlbums(): void {
    this.router.navigateByUrl('/albums');
  }

  goToUsers(): void {
    this.router.navigateByUrl('/users');
  }

  openJsonServer(): void {
    window.open(this.appConstants.Application.JSON_SERVER_API_URL);
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationBarComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationBarComponent,
  ],
  template: `
    <app-navigation-bar></app-navigation-bar>
    <div class="main-view">
      <router-outlet></router-outlet>
    </div>`,
  styles: `
    .main-view {
      padding-top: 4.25rem;
    }
  `,
})
export class AppComponent {
}

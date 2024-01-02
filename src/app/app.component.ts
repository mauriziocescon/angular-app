import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navigation-bar></app-navigation-bar>
    <div class="main-view">
      <router-outlet></router-outlet>
    </div>`,
  styles: [`
    .main-view {
      padding-top: 4.25rem;
    }
  `],
})
export class AppComponent {
}

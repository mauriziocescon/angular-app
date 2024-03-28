import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { User } from '../user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{ title() }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ subtitle() }}</h6>
        <p class="card-text">{{ content() }}</p>
      </div>
    </div>`,
})
export class UserComponent {
  user = input<User>();
  title = computed(() => this.user().id);
  subtitle = computed(() => this.user().username);
  content = computed(() => `${this.user().email} - ${this.user().website}`);
}

import { Component, Input } from '@angular/core';

import { User } from '../user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{ user.id }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ user.username }}</h6>
        <p class="card-text">{{ user.email }} - {{ user.website }}</p>
      </div>
    </div>`,
})
export class UserComponent {
  @Input() user: User;
}

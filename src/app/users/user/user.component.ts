import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { User } from '../user.model';

@Component({
  selector: 'app-user',
  template: `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{ user.id }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ user.username }}</h6>
        <p class="card-text">{{ user.email }} - {{ user.website }}</p>
      </div>
    </div>`,
})
export class UserComponent implements OnInit, OnDestroy {
  @Input() user: User;

  constructor(protected translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}

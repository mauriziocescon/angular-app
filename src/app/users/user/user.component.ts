import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { User } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
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

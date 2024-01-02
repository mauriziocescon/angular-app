import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Album } from '../album.model';

@Component({
  selector: 'app-album',
  template: `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{ album.id }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ album.title }}</h6>
      </div>
    </div>`,
})
export class AlbumComponent implements OnInit, OnDestroy {
  @Input() album: Album;

  constructor(protected translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}

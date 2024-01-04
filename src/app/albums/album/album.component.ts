import { Component, Input } from '@angular/core';

import { Album } from '../album.model';

@Component({
  selector: 'app-album',
  standalone: true,
  template: `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{ album.id }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ album.title }}</h6>
      </div>
    </div>`,
})
export class AlbumComponent {
  @Input() album: Album;
}

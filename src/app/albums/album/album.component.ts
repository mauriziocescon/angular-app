import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Album } from '../album.model';

@Component({
  selector: 'app-album',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{ title() }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ subtitle() }}</h6>
      </div>
    </div>`,
})
export class AlbumComponent {
  album = input<Album>();
  title = computed(() => this.album().id);
  subtitle = computed(() => this.album().title);
}

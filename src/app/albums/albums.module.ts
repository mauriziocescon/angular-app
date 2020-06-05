import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AlbumsRoutingModule } from './albums-routing.module';

import { AlbumModule } from './album/album.module';

import { AlbumsComponent } from './albums.component';
import { AlbumsService } from './albums.data-service';

@NgModule({
  imports: [
    SharedModule,
    AlbumsRoutingModule,
    AlbumModule,
  ],
  declarations: [
    AlbumsComponent,
  ],
  providers: [
    AlbumsService,
  ],
  exports: [],
})
export class AlbumsModule {
}

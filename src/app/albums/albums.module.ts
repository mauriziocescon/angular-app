import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AlbumsRoutingModule } from './albums-routing.module';

import { AlbumsComponent } from './albums.component';
import { AlbumsService } from './albums.data-service';

@NgModule({
  imports: [
    SharedModule,
    AlbumsRoutingModule,
  ],
  declarations: [
    AlbumsComponent,
  ],
  exports: [],
  providers: [
    AlbumsService,
  ],
})
export class AlbumsModule {
}

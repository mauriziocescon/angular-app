import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { AlbumComponent } from './album.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AlbumComponent,
  ],
  providers: [],
  exports: [
    AlbumComponent,
  ],
})
export class AlbumModule {
}

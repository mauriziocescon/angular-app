import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumsComponent } from './albums.component';

export const albumsRoutes: Routes = [
  {
    path: 'albums',
    component: AlbumsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(albumsRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AlbumsRoutingModule {
}

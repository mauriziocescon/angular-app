import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

export const appRoutes: Routes = [
  {
    path: 'albums',
    loadChildren: './albums/albums.module#AlbumsModule',
  },
  {
    path: 'chart',
    loadChildren: './chart/chart.module#ChartModule',
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: !environment.production,
      useHash: true,
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}

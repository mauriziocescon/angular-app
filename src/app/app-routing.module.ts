import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

export const appRoutes: Routes = [
  {
    path: 'albums',
    loadChildren: () => import('./albums/albums.module').then(mod => mod.AlbumsModule),
  },
  {
    path: 'chart',
    loadChildren: () => import('./chart/chart.module').then(mod => mod.ChartModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule),
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

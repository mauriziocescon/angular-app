import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'albums', loadChildren: () => import('./albums/albums.routes') },
  { path: 'chart', loadChildren: () => import('./chart/chart.routes') },
  { path: 'users', loadChildren: () => import('./users/users.routes') },
  { path: '**', redirectTo: '/users' },
];

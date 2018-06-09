import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class UserRoutingModule {
}

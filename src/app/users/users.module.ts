import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { UserRoutingModule } from './users-routing.module';

import { UserModule } from './user/user.module';

import { UsersComponent } from './users.component';
import { UsersService } from './users.data-service';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
    UserModule,
  ],
  declarations: [
    UsersComponent,
  ],
  providers: [
    UsersService,
  ],
  exports: [],
})
export class UsersModule {
}

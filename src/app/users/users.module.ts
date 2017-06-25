import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { UsersComponent } from "./users.component";
import { UsersService } from "./users.data-service";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    UsersComponent
  ],
  exports: [],
  providers: [
      UsersService
  ],
})
export class UsersModule {
}

export {
  UsersComponent
};


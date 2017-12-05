import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { UsersComponent } from "./users.component";
import { UsersService } from "./users.data-service";
import { UsersPostsComponent } from "./users-posts/users-posts.component";
import { PostCommentsComponent } from "./users-posts/post-comments/post-comments.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    UsersComponent,
    UsersPostsComponent,
    PostCommentsComponent,
  ],
  exports: [],
  providers: [
    UsersService,
  ],
})
export class UsersModule {
}

export {
  UsersComponent,
};


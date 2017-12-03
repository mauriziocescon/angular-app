import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormBuilder } from "@angular/forms";

import { TranslateService } from "@ngx-translate/core";

import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";

import { UsersComponent } from "./users.component";
import { UsersService } from "./users.data-service";
import { UsersPostsComponent } from "./users-posts/users-posts.component";
import { PostCommentsComponent } from "./users-posts/post-comments/post-comments.component";

describe("UsersComponent", () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        UsersComponent,
        UsersPostsComponent,
        PostCommentsComponent
      ],
      providers: [
        FormBuilder,
        TranslateService,
        {provide: UsersService, useValue: {}}, // todo: Provide a test-double service
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});

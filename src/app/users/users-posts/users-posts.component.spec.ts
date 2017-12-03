import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormBuilder } from "@angular/forms";

import { TranslateService } from "@ngx-translate/core";

import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";

import { UsersPostsComponent } from "./users-posts.component";
import { PostCommentsComponent } from "./post-comments/post-comments.component";

describe("UsersPostsComponent", () => {
  let component: UsersPostsComponent;
  let fixture: ComponentFixture<UsersPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        UsersPostsComponent,
        PostCommentsComponent
      ],
      providers: [
        FormBuilder,
        TranslateService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});

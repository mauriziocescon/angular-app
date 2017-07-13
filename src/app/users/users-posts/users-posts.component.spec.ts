import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UsersPostsComponent } from "./users-posts.component";

describe("UsersPostsComponent", () => {
  let component: UsersPostsComponent;
  let fixture: ComponentFixture<UsersPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersPostsComponent]
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

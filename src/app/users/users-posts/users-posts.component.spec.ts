import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Http } from "@angular/http";
import { FormBuilder } from "@angular/forms";

import { TranslateModule, TranslateStaticLoader, TranslateLoader, TranslateService } from "ng2-translate";
import "rxjs/Rx";

import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";

import { UsersPostsComponent } from "./users-posts.component";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, "assets/i18n/", ".json");
}

describe("UsersPostsComponent", () => {
  let component: UsersPostsComponent;
  let fixture: ComponentFixture<UsersPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        SharedModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http],
        }),
      ],
      declarations: [
        UsersPostsComponent
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

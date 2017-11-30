import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { HttpClient } from "@angular/common/http";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        })
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  //
  // it(`should have as title "app works!"`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual("app works!");
  // }));
  //
  // it("should render title in a h1 tag", async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector("h1").textContent).toContain("app works!");
  // }));
});

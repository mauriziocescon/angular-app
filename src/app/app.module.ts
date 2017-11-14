import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Http, HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";

import { TranslateModule, TranslateStaticLoader, TranslateLoader } from "ng2-translate";

import { appRoutes } from "./app.routes";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { ChartModule } from "./chart/chart.module";
import { UsersModule } from "./users/users.module";

import { environment } from "../environments/environment";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  imports: [
    BrowserModule,
    environment.production ? ServiceWorkerModule.register("/ngsw-worker.js") : [],
    HttpModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http],
    }),
    CoreModule.forRoot(),
    SharedModule,
    ChartModule,
    UsersModule,
  ],
  declarations: [
    AppComponent,
  ],
  exports: [
    AppComponent,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

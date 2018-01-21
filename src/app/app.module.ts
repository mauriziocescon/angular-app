import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";

import { appRoutes } from "./app.routes";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { ChartModule } from "./chart/chart.module";
import { UsersModule } from "./users/users.module";

import { environment } from "../environments/environment";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  imports: [
    BrowserModule,
    environment.production ? ServiceWorkerModule.register("/ngsw-worker.js") : [],
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    LoggerModule.forRoot({
      serverLoggingUrl: environment.apiUrl + "logs",
      level: !environment.production ? NgxLoggerLevel.ERROR : NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.LOG,
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
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}

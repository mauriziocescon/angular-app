import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";

import { appRoutes } from "./app.routes";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { ChartModule } from "./chart/chart.module";
import { UsersModule } from "./users/users.module";

import { environment } from "../environments/environment";

@NgModule({
  imports: [
    BrowserModule,
    environment.production ? ServiceWorkerModule.register("/ngsw-worker.js") : [],
    RouterModule.forRoot(appRoutes),
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

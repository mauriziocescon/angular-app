import { Routes } from "@angular/router";

import { ChartComponent } from "./chart/chart.module";
import { UsersComponent } from "./users/users.module";

export const appRoutes: Routes = [
  {path: "chart", component: ChartComponent},
  {path: "users", component: UsersComponent},
  {path: "", redirectTo: "/users", pathMatch: "full"},
];

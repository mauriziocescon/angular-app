import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { AppConstantsService, UtilitiesService } from "../core/core.module";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  protected http: HttpClient;
  protected appConstants: AppConstantsService;
  protected utilities: UtilitiesService;

  constructor(http: HttpClient,
              appConstantsService: AppConstantsService,
              utilitiesService: UtilitiesService) {
    this.http = http;
    this.appConstants = appConstantsService;
    this.utilities = utilitiesService;
  }

  public getUsers(textFilter: string): Observable<User[]> {
    const url = this.appConstants.Api.users;
    const options = {
      params: {q: textFilter},
    };

    return this.http.get<User[]>(url, options)
      .map(data => data)
      .catch(err => Observable.throw(err.json().error || "Server error"));
  }
}

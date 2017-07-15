import { Injectable } from "@angular/core";
import { Http, RequestOptionsArgs } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { AppConstantsService, UtilitiesService } from "../core/core.module";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  protected http: Http;
  protected appConstants: AppConstantsService;
  protected utilities: UtilitiesService;

  constructor(http: Http,
              appConstantsService: AppConstantsService,
              utilitiesService: UtilitiesService) {
    this.http = http;
    this.appConstants = appConstantsService;
    this.utilities = utilitiesService;
  }

  public getUsers(textFilter: string): Observable<User[]> {
    const url = this.appConstants.Application.WS_URL + "/users";
    const options: RequestOptionsArgs = {
      params: {q: textFilter},
    };

    return this.http.get(url, options)
      .map(response => response.json());
  }
}

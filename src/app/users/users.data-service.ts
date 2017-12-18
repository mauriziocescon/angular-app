import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { AppConstantsService } from "../core/core.module";
import { User } from "./users.model";

@Injectable()
export class UsersService {

  constructor(protected http: HttpClient,
              protected appConstants: AppConstantsService) {
  }

  public getUsers(textFilter: string): Observable<User[]> {
    const url = this.appConstants.Api.users;
    const options = {
      params: {q: textFilter},
    };

    return this.http.get<User[]>(url, options)
      .map(data => data)
      .catch(err => {
        console.log(`Observable.throw: ${JSON.stringify(err, null, 2)}`);
        return Observable.throw(err.message || "Server error");
      });
  }
}

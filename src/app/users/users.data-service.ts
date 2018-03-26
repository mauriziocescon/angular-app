import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';

import { AppConstantsService, UtilitiesService } from '../core/core.module';

import { User } from './users.model';

@Injectable()
export class UsersService {

  constructor(protected http: HttpClient,
              protected appConstants: AppConstantsService,
              protected utilities: UtilitiesService) {
  }

  getUsers(textFilter: string | undefined, page: number): Observable<{ users: User[], lastPage: boolean }> {
    const url = this.appConstants.Api.users;
    const params = { q: textFilter || '', _page: page.toString() };

    return this.http.get<User[]>(url, { params: params, observe: 'response' })
      .map(response => {
        const info = this.utilities.parseLinkHeaders(response.headers);

        const lastPage = parseInt(info ? info.last._page : '1', 10) === page;
        return { users: response.body, lastPage: lastPage };
      })
      .catch((err: HttpErrorResponse) => this.handleError(err));
  }

  protected handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      return new ErrorObservable(err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      return new ErrorObservable(`Code ${err.status}, body: ${err.message}` || 'Server error');
    }
  }
}

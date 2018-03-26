import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppConstantsService } from '../core/core.module';

import { User } from './user.model';

@Injectable()
export class UsersService {

  constructor(protected http: HttpClient,
              protected appConstants: AppConstantsService) {
  }

  getUsers(textFilter: string | undefined): Observable<User[]> {
    const url = this.appConstants.Api.users;
    const params = { q: textFilter || '' };

    return this.http.get<User[]>(url, { params: params })
      .map(data => data)
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

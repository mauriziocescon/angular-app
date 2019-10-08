import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {
  catchError,
  map,
} from 'rxjs/operators';

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

    return this.http.get<User[]>(url, { params })
      .pipe(
        map(data => data),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  protected handleError(err: HttpErrorResponse): Observable<never> {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      return throwError(err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      return throwError(`Code ${err.status}, body: ${err.message}` || 'Server error');
    }
  }
}

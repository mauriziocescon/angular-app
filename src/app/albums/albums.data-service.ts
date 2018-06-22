import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {
  catchError,
  map,
} from 'rxjs/operators';

import { AppConstantsService, UtilitiesService } from '../core/core.module';

import { Album } from './album.model';

@Injectable()
export class AlbumsService {

  constructor(protected http: HttpClient,
              protected appConstants: AppConstantsService,
              protected utilities: UtilitiesService) {
  }

  getAlbums(textFilter: string | undefined, page: number): Observable<{ albums: Album[], lastPage: boolean }> {
    const url = this.appConstants.Api.albums;
    const params = { q: textFilter || '', _page: page.toString() };

    return this.http.get<Album[]>(url, { params: params, observe: 'response' })
      .pipe(
        map(response => {
          const info = this.utilities.parseLinkHeaders(response.headers);

          const lastPage = parseInt(info ? info.last._page : '1', 10) === page;
          return { albums: response.body, lastPage: lastPage };
        }),
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

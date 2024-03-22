import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {
  catchError,
  map,
} from 'rxjs/operators';

import { AppConstantsService } from '../core';

import { Album } from './album.model';

@Injectable()
export class AlbumsService {
  private http = inject(HttpClient);
  private appConstants = inject(AppConstantsService);

  getAlbums(textFilter: string | undefined, page: number): Observable<{
    albums: Album[],
    lastPage: boolean
  }> {
    const url = this.appConstants.Api.albums;
    const _start = (page - 1) * 20, _limit = 20;
    const params = { q: textFilter || '', _start, _limit };

    return this.http.get<Album[]>(url, { params, observe: 'response' })
      .pipe(
        map(response => {
          const numOfItems = parseInt(response.headers.get('X-Total-Count'), 10);
          const lastPage = _start + _limit >= numOfItems;

          return { albums: response.body as Album[], lastPage };
        }),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    if (err.status === 0) {
      // A client-side or network error occurred
      return throwError(() => err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      return throwError(() => `Code ${err.status}, body: ${err.message}`);
    }
  }
}

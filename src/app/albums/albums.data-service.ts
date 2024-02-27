import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {
  catchError,
  map,
} from 'rxjs/operators';

import { AppConstantsService, UtilitiesService } from '../core';

import { Album } from './album.model';

@Injectable()
export class AlbumsService {
  private http = inject(HttpClient);
  private appConstants = inject(AppConstantsService);
  private utilities = inject(UtilitiesService);

  getAlbums(textFilter: string | undefined, page: number, limit: number): Observable<{
    albums: Album[],
    lastPage: boolean
  }> {
    const url = this.appConstants.Api.albums;
    const params = { q: textFilter || '', _page: page.toString(), _limit: limit.toString() };

    return this.http.get<Album[]>(url, { params, observe: 'response' })
      .pipe(
        map(response => {
          const info = this.utilities.parseLinkHeaders(response.headers);

          const lastPage = parseInt(info ? info.last._page : '1', 10) === page;
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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
      .map(response => {
        const info = this.utilities.parseLinkHeaders(response.headers);

        const lastPage = parseInt(info ? info.last._page : '1', 10) === page;
        return { albums: response.body, lastPage: lastPage };
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppConstantsService, UtilitiesService } from '../core/core.module';

import { User } from './users.model';

import { environment } from '../../environments/environment';

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
        let info = this.utilities.parseLinkHeaders(response.headers);

        if (!info.last) {
          // default value: when there are no
          // pages, info is empty
          info = {
            first: environment.apiUrl + 'users?_page=1',
            last: environment.apiUrl + 'users?_page=1',
            next: environment.apiUrl + 'users?_page=1',
          };
        }

        const lastPage = parseInt(this.utilities.parseQueryString(info.last)._page, 10) === page;
        return { users: response.body, lastPage: lastPage };
      })
      .catch(err => {
        return Observable.throw(err.message || 'Server error');
      });
  }
}

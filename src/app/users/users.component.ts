import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { TranslateService } from '@ngx-translate/core';

import { UIUtilitiesService } from '../shared/shared.module';

import { UsersService } from './users.data-service';
import { User } from './users.model';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  protected paramsSubject$: Subject<{ textSearch: string, pageNumber: number }>;
  protected paramsObservable$: Observable<{ textSearch: string, pageNumber: number }>;
  protected paramsSubscription: any;

  protected users: User[] | undefined;
  protected textSearch: string;
  protected pageNumber: number;
  protected loadCompleted: boolean;
  protected retry: boolean;
  protected busy: boolean;

  // todo: remove it when you're done
  date: any;

  constructor(protected translate: TranslateService,
              protected uiUtilities: UIUtilitiesService,
              protected usersService: UsersService) {
  }

  get isLoadingData(): boolean {
    return this.busy === true;
  }

  public get isLoadCompleted(): boolean {
    return this.isLoadingData === false && this.users !== undefined && this.users.length > 0 && this.loadCompleted === true;
  }

  get hasNoData(): boolean {
    return this.users !== undefined && this.users.length === 0 && this.isLoadingData === false;
  }

  get shouldRetry(): boolean {
    return this.retry === true && this.isLoadingData === false;
  }

  get dataSource(): User[] | undefined {
    return this.users;
  }

  ngOnInit(): void {
    this.busy = false;
    this.pageNumber = 1;
    this.loadCompleted = false;

    this.paramsSubject$ = new Subject();
    this.paramsObservable$ = this.paramsSubject$.asObservable();

    this.loadDataSource();
  }

  trackByUser(index: number, user: User): number {
    return user.id;
  }

  textSearchValueDidChange(value: string): void {
    this.textSearch = value;
    this.pageNumber = 1;
    this.users = undefined;

    const params = {
      textSearch: value,
      pageNumber: this.pageNumber,
    };

    this.paramsSubject$.next(params);
  }

  onScroll(): void {
    if (this.loadCompleted === false) {
      const params = {
        textSearch: this.textSearch,
        pageNumber: this.pageNumber,
      };

      this.paramsSubject$.next(params);
    }
  }

  loadDataSource(): void {
    this.unsubscribeAll();

    this.paramsSubscription = this.paramsObservable$
      .startWith({ textSearch: this.textSearch, pageNumber: this.pageNumber })
      .do(() => this.busy = true)
      .debounceTime(50)
      .switchMap((params: { textSearch: string, pageNumber: number }) => {
        console.log(`this.usersService.getUsers: ${params.textSearch}, ${params.pageNumber}`);
        return this.usersService.getUsers(params.textSearch, params.pageNumber);
      })
      .do(() => this.busy = false)
      .subscribe((data: { users: User[], lastPage: boolean }) => {
        this.users = this.users === undefined ? data.users : this.users.concat(data.users);
        this.loadCompleted = data.lastPage;

        if (!this.loadCompleted) {
          this.pageNumber++;
        }

        this.date = new Date();
      }, err => {
        this.busy = false;
        this.retry = true;
        this.translate
          .get(['USERS.ERROR_ACCESS_DATA', 'USERS.CLOSE'])
          .subscribe((translations: any) => {
            this.uiUtilities.modalAlert(translations['USERS.ERROR_ACCESS_DATA'], err, translations['USERS.CLOSE']);
          });
      });
  }

  retryLoadingDataSource(): void {
    this.retry = false;
    this.loadDataSource();
  }

  unsubscribeAll(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}

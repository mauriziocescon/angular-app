import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { UIUtilitiesService } from '../shared/shared.module';

import { UsersService } from './users.data-service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  protected paramsSubject$: Subject<{ textSearch: string }>;
  protected paramsObservable$: Observable<{ textSearch: string }>;
  protected paramsSubscription: any;

  protected users: User[] | undefined;
  protected textSearch: string;
  protected busy: boolean;

  constructor(protected translate: TranslateService,
              protected uiUtilities: UIUtilitiesService,
              protected usersService: UsersService) {
  }

  get isLoadingData(): boolean {
    return this.busy === true;
  }

  get hasNoData(): boolean {
    return this.users !== undefined && this.users.length === 0 && this.isLoadingData === false;
  }

  get shouldRetry(): boolean {
    return this.users === undefined && this.isLoadingData === false;
  }

  get showData(): boolean {
    return this.isLoadingData === false && this.hasNoData === false && this.shouldRetry === false;
  }

  get dataSource(): User[] | undefined {
    return this.users;
  }

  ngOnInit(): void {
    this.busy = false;

    this.paramsSubject$ = new Subject();
    this.paramsObservable$ = this.paramsSubject$.asObservable();

    this.loadDataSource();
  }

  trackByUser(index: number, user: User): number {
    return user.id;
  }

  textSearchValueDidChange(value: string): void {
    this.textSearch = value;
    this.users = undefined;

    const params = {
      textSearch: value,
    };

    this.paramsSubject$.next(params);
  }

  loadDataSource(): void {
    this.unsubscribeAll();

    this.paramsSubscription = this.paramsObservable$
      .pipe(
        startWith({ textSearch: this.textSearch }),
        tap(() => this.busy = true),
        debounceTime(50),
        switchMap((params: { textSearch: string }) => {
          return this.usersService.getUsers(params.textSearch);
        }),
        tap(() => this.busy = false),
        catchError(err => {
          this.busy = false;
          this.uiUtilities.modalAlert(
            this.translate.instant('USERS.ERROR_ACCESS_DATA'),
            err,
            this.translate.instant('USERS.CLOSE'),
          );
          return throwError(err);
        }),
      )
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  retryLoadingDataSource(): void {
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

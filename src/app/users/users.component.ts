import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, Subscription, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ScrollToTopDirective, TextFilterComponent, UIUtilitiesService } from '../shared';

import { UserComponent } from './user/user.component';

import { UsersService } from './users.data-service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TranslateModule,
    ScrollToTopDirective,
    TextFilterComponent,
    UserComponent,
  ],
  providers: [
    UsersService,
  ],
  template: `
    <div class="container-fluid users-component">

      <div class="row">
        <div class="col-12">
          <app-text-filter (valueDidChange)="textSearchValueDidChange($event)"></app-text-filter>
        </div>
      </div>

      @if (showData) {
        <div class="row">
          @for (user of dataSource; track user.id) {
            <div class="col-12 col-sm-6 user">
              <app-user [user]="user"></app-user>
            </div>
          }
          <div class="col-12">
            <div class="full-width-message">{{ "USERS.LOAD_COMPLETED" | translate }}</div>
          </div>
        </div>
      }

      <div class="full-width-message" [hidden]="!isLoadingData">{{ "USERS.LOADING" | translate }}</div>
      <div class="full-width-message" [hidden]="!hasNoData">{{ "USERS.NO_RESULT" | translate }}</div>
      <div class="full-width-message" [hidden]="!shouldRetry"
           (click)="retryLoadingDataSource()">{{ "USERS.RETRY" | translate }}
      </div>
      <div class="go-up" appScrollToTop></div>
    </div>`,
  styles: `
    .users-component {
      padding-top: 10px;

      .user {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
  `,
})
export class UsersComponent implements OnInit, OnDestroy {
  protected paramsSubject$: Subject<{ textSearch: string }>;
  protected paramsObservable$: Observable<{ textSearch: string }>;
  protected paramsSubscription: Subscription;

  protected users: User[] | undefined;
  protected textSearch: string;
  protected busy: boolean;

  protected translate = inject(TranslateService);
  protected uiUtilities = inject(UIUtilitiesService);
  protected usersService = inject(UsersService);

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
        switchMap(({ textSearch }) => this.usersService.getUsers(textSearch)),
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
      .subscribe(users => this.users = users);
  }

  retryLoadingDataSource(): void {
    this.loadDataSource();
  }

  unsubscribeAll(): void {
    this.paramsSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}

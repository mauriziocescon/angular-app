import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, Subscription, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

import { ScrollToTopDirective, TextFilterComponent, UIUtilitiesService } from '../shared';

import { UserComponent } from './user/user.component';

import { UsersService } from './users.data-service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TranslocoPipe,
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
            <div class="full-width-message">{{ "USERS.LOAD_COMPLETED" | transloco }}</div>
          </div>
        </div>
      }

      <div class="full-width-message" [hidden]="!isLoadingData">{{ "USERS.LOADING" | transloco }}</div>
      <div class="full-width-message" [hidden]="!hasNoData">{{ "USERS.NO_RESULT" | transloco }}</div>
      <div class="full-width-message" [hidden]="!shouldRetry" (click)="retryLoadingDataSource()">
        {{ "USERS.RETRY" | transloco }}
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
  private paramsSubject$: Subject<{ textSearch: string }>;
  private paramsObservable$: Observable<{ textSearch: string }>;
  private paramsSubscription: Subscription;

  private users: User[] | undefined;
  private textSearch: string;
  private busy: boolean;

  private transloco = inject(TranslocoService);
  private uiUtilities = inject(UIUtilitiesService);
  private usersService = inject(UsersService);

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
            this.transloco.translate('USERS.ERROR_ACCESS_DATA'),
            err,
            this.transloco.translate('USERS.CLOSE'),
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

import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UsersService,
  ],
  template: `
    <div class="container-fluid users-component">

      <div class="row">
        <div class="col-12">
          <app-text-filter (valueDidChange)="textSearchDidChange($event)"></app-text-filter>
        </div>
      </div>

      @if (showData()) {
        <div class="row">
          @for (user of users(); track user.id) {
            <div class="col-12 col-sm-6 user">
              <app-user [user]="user"></app-user>
            </div>
          }
          <div class="col-12">
            <div class="full-width-message">{{ "USERS.LOAD_COMPLETED" | transloco }}</div>
          </div>
        </div>
      }

      <div class="full-width-message" [hidden]="!isLoading()">{{ "USERS.LOADING" | transloco }}</div>
      <div class="full-width-message" [hidden]="!hasNoData()">{{ "USERS.NO_RESULT" | transloco }}</div>
      <div class="full-width-message" [hidden]="!shouldRetry()" (click)="retry()"> {{ "USERS.RETRY" | transloco }}</div>
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
  users = signal<User[] | undefined>(undefined);
  isLoading = signal<boolean>(false);
  hasNoData = computed(() => this.users()?.length === 0 && this.isLoading() === false);
  shouldRetry = computed(() => this.users() === undefined && this.isLoading() === false);
  showData = computed(() => this.isLoading() === false && this.hasNoData() === false && this.shouldRetry() === false);

  private paramsSubject$ = new Subject<{ textSearch: string }>();
  private paramsObservable$: Observable<{ textSearch: string }>;
  private paramsSubscription: Subscription;

  private transloco = inject(TranslocoService);
  private uiUtilities = inject(UIUtilitiesService);
  private usersService = inject(UsersService);

  ngOnInit(): void {
    this.isLoading.set(false);
    this.paramsObservable$ = this.paramsSubject$.asObservable();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  textSearchDidChange(textSearch: string): void {
    this.users.set(undefined);
    this.paramsSubject$.next({ textSearch });
  }

  loadData(): void {
    this.unsubscribeAll();

    this.paramsSubscription = this.paramsObservable$
      .pipe(
        startWith({ textSearch: undefined }),
        tap(() => this.isLoading.set(true)),
        debounceTime(50),
        switchMap(({ textSearch }) => this.usersService.getUsers(textSearch)),
        tap(() => this.isLoading.set(false)),
        catchError(err => {
          this.isLoading.set(false);
          this.uiUtilities.modalAlert(
            this.transloco.translate('USERS.ERROR_ACCESS_DATA'),
            err,
            this.transloco.translate('USERS.CLOSE'),
          );
          return throwError(err);
        }),
      )
      .subscribe(users => this.users.set(users));
  }

  retry(): void {
    this.loadData();
  }

  unsubscribeAll(): void {
    this.paramsSubscription?.unsubscribe();
  }
}

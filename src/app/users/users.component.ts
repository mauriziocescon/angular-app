import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/catch';
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
  searchForm: FormGroup;
  protected searchControl: FormControl;

  protected pageSubject$: Subject<number>;
  protected pageObservable$: Observable<number>;

  protected paramsObservable$: Observable<[string, number]>;
  protected paramsSubscription: any;

  protected users: User[] | undefined;
  protected pageNumber: number;
  protected loadCompleted: boolean;
  protected retry: boolean;
  protected busy: boolean;

  // todo: remove it when you're done
  date: any;

  constructor(protected formBuilder: FormBuilder,
              protected translate: TranslateService,
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
    return this.retry === true && this.isLoadingData === false;
  }

  get dataSource(): User[] | undefined {
    return this.users;
  }

  get isTextFilterNotEmpty(): boolean {
    return this.searchControl.value;
  }

  ngOnInit(): void {
    this.busy = false;
    this.pageNumber = 1;

    this.pageSubject$ = new Subject();
    this.pageObservable$ = this.pageSubject$.asObservable();

    this.searchForm = this.formBuilder.group({
      textFilter: this.searchControl = new FormControl(''),
    });

    this.setupParamsObservable();
    this.loadDataSource();
  }

  resetTextFilter(): void {
    this.searchControl.setValue('');
  }

  trackByUser(index: number, user: User): number {
    return user.id;
  }

  setupParamsObservable(): void {
    this.paramsObservable$ = Observable.combineLatest(
      this.searchControl
        .valueChanges
        .startWith(this.searchControl.value)
        .do(() => this.busy = true)
        .do(() => this.users = undefined)
        .debounceTime(400)
        .do(() => this.pageSubject$.next(this.pageNumber = 1)),
      this.pageObservable$
        .startWith(this.pageNumber)
        .do(() => this.busy = true));
  }

  onScroll(): void {
    this.pageSubject$.next(this.pageNumber);
  }

  loadDataSource(): void {
    this.unsubscribeAll();

    this.paramsSubscription = this.paramsObservable$
      .debounceTime(50)
      .switchMap((parameters: [string, number]) => {
        const textSearch = parameters[0];
        const pageNumber = parameters[1];
        console.log(`this.usersService.getUsers: ${textSearch}, ${pageNumber}`);
        return this.usersService.getUsers(textSearch, pageNumber);
      })
      .do(() => this.busy = false)
      .subscribe((data: { users: User[], lastPage: boolean }) => {
          this.users = this.users === undefined ? data.users : [];
          this.loadCompleted = data.lastPage;

          if (!this.loadCompleted) {
            this.pageNumber++;
          }

          this.date = new Date();
        },
        (err: string) => {
          this.busy = false;
          this.retry = true;
          this.translate
            .get(['USERS.ERROR_ACCESS_DATA', 'USERS.CLOSE'])
            .subscribe((translations: any) => {
              this.uiUtilities.modalAlert(translations['USERS.ERROR_ACCESS_DATA'], err, translations['USERS.CLOSE']);
            });
        },
        () => {
          // do nothing
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

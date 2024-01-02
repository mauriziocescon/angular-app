import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, Subscription, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { UIUtilitiesService } from '../shared/shared.module';

import { AlbumsService } from './albums.data-service';
import { Album } from './album.model';

@Component({
  selector: 'app-albums',
  template: `
    <div class="container-fluid albums-component" infiniteScroll (scrolled)="onScroll()">

      <div class="row">
        <div class="col-12">
          <app-text-filter (valueDidChange)="textSearchValueDidChange($event)"></app-text-filter>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-sm-6 album" *ngFor="let album of dataSource; trackBy: trackByAlbum">
          <app-album [album]="album"></app-album>
        </div>
      </div>

      <div class="full-width-message" [hidden]="!isLoadingData">{{ "ALBUMS.LOADING" | translate }}</div>
      <div class="full-width-message" [hidden]="!hasNoData">{{ "ALBUMS.NO_RESULT" | translate }}</div>
      <div class="full-width-message" [hidden]="!isLoadCompleted">{{ "ALBUMS.LOAD_COMPLETED" | translate }}</div>
      <div class="full-width-message" [hidden]="!shouldRetry" (click)="retryLoadingDataSource()">{{ "ALBUMS.RETRY" | translate }}</div>
      <div class="go-up" appScrollToTop></div>
    </div>`,
  styles: [`
    .albums-component {
      padding-top: 10px;

      .album {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
  `],
})
export class AlbumsComponent implements OnInit, OnDestroy {
  protected paramsSubject$: Subject<{ textSearch: string, pageNumber: number, limit: number }>;
  protected paramsObservable$: Observable<{ textSearch: string, pageNumber: number, limit: number }>;
  protected paramsSubscription: Subscription;

  protected albums: Album[] | undefined;
  protected textSearch: string;
  protected pageNumber: number;
  protected limit: number;
  protected loadCompleted: boolean;
  protected retry: boolean;
  protected busy: boolean;

  constructor(protected translate: TranslateService,
              protected uiUtilities: UIUtilitiesService,
              protected albumsService: AlbumsService) {
    this.limit = 20;
  }

  get isLoadingData(): boolean {
    return this.busy === true;
  }

  public get isLoadCompleted(): boolean {
    return this.isLoadingData === false && this.albums !== undefined && this.albums.length > 0 && this.loadCompleted === true;
  }

  get hasNoData(): boolean {
    return this.albums !== undefined && this.albums.length === 0 && this.isLoadingData === false;
  }

  get shouldRetry(): boolean {
    return this.retry === true && this.isLoadingData === false;
  }

  get dataSource(): Album[] | undefined {
    return this.albums;
  }

  ngOnInit(): void {
    this.busy = false;
    this.pageNumber = 1;
    this.loadCompleted = false;

    this.paramsSubject$ = new Subject();
    this.paramsObservable$ = this.paramsSubject$.asObservable();

    this.loadDataSource();
  }

  trackByAlbum(index: number, album: Album): number {
    return album.id;
  }

  textSearchValueDidChange(value: string): void {
    this.textSearch = value;
    this.pageNumber = 1;
    this.albums = undefined;

    const params = {
      textSearch: value,
      pageNumber: this.pageNumber,
      limit: this.limit,
    };

    this.paramsSubject$.next(params);
  }

  onScroll(): void {
    if (this.loadCompleted === false) {
      const params = {
        textSearch: this.textSearch,
        pageNumber: this.pageNumber,
        limit: this.limit,
      };

      this.paramsSubject$.next(params);
    }
  }

  loadDataSource(): void {
    this.unsubscribeAll();

    this.paramsSubscription = this.paramsObservable$
      .pipe(
        startWith({ textSearch: this.textSearch, pageNumber: this.pageNumber, limit: this.limit }),
        tap(() => this.busy = true),
        debounceTime(50),
        switchMap(({ textSearch, pageNumber, limit }) => {
          return this.albumsService.getAlbums(textSearch, pageNumber, limit);
        }),
        tap(() => this.busy = false),
        catchError(err => {
          this.busy = false;
          this.retry = true;
          this.uiUtilities.modalAlert(
            this.translate.instant('ALBUMS.ERROR_ACCESS_DATA'),
            err,
            this.translate.instant('ALBUMS.CLOSE'),
          );
          return throwError(err);
        }),
      )
      .subscribe(data => {
        this.albums = this.albums === undefined ? data.albums : this.albums.concat(data.albums);
        this.loadCompleted = data.lastPage;

        if (!this.loadCompleted) {
          this.pageNumber++;
        }
      });
  }

  retryLoadingDataSource(): void {
    this.retry = false;
    this.loadDataSource();
  }

  unsubscribeAll(): void {
    this.paramsSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}

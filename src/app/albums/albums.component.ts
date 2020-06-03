import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {
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
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit, OnDestroy {
  protected paramsSubject$: Subject<{ textSearch: string, pageNumber: number }>;
  protected paramsObservable$: Observable<{ textSearch: string, pageNumber: number }>;
  protected paramsSubscription: any;

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
        switchMap((params: { textSearch: string, pageNumber: number, limit: number }) => {
          return this.albumsService.getAlbums(params.textSearch, params.pageNumber, params.limit);
        }),
        tap(() => this.busy = false),
      )
      .subscribe((data: { albums: Album[], lastPage: boolean }) => {
        this.albums = this.albums === undefined ? data.albums : this.albums.concat(data.albums);
        this.loadCompleted = data.lastPage;

        if (!this.loadCompleted) {
          this.pageNumber++;
        }
      }, err => {
        this.busy = false;
        this.retry = true;
        this.translate
          .get(['ALBUMS.ERROR_ACCESS_DATA', 'ALBUMS.CLOSE'])
          .subscribe((translations: any) => {
            this.uiUtilities.modalAlert(translations['ALBUMS.ERROR_ACCESS_DATA'], err, translations['ALBUMS.CLOSE']);
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

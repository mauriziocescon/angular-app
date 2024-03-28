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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ScrollToTopDirective, TextFilterComponent, UIUtilitiesService } from '../shared';

import { AlbumComponent } from './album/album.component';

import { AlbumsService } from './albums.data-service';
import { Album } from './album.model';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [
    TranslocoPipe,
    InfiniteScrollModule,
    ScrollToTopDirective,
    TextFilterComponent,
    AlbumComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AlbumsService,
  ],
  template: `
    <div class="container-fluid albums-component" infiniteScroll (scrolled)="onScroll()">

      <div class="row">
        <div class="col-12">
          <app-text-filter (valueDidChange)="textSearchDidChange($event)"></app-text-filter>
        </div>
      </div>

      <div class="row">
        @for (album of this.albums(); track album.id) {
          <div class="col-12 col-sm-6 album">
            <app-album [album]="album"></app-album>
          </div>
        }
      </div>

      <div class="full-width-message" [hidden]="!isLoading()">{{ "ALBUMS.LOADING" | transloco }}</div>
      <div class="full-width-message" [hidden]="!hasNoData()">{{ "ALBUMS.NO_RESULT" | transloco }}</div>
      <div class="full-width-message" [hidden]="!isLoadCompleted()">{{ "ALBUMS.LOAD_COMPLETED" | transloco }}</div>
      <div class="full-width-message" [hidden]="!shouldRetry()" (click)="retry()"> {{ "ALBUMS.RETRY" | transloco }}
      </div>
      <div class="go-up" appScrollToTop></div>
    </div>`,
  styles: `
    .albums-component {
      padding-top: 10px;

      .album {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
  `,
})
export class AlbumsComponent implements OnInit, OnDestroy {
  params = signal<{ textSearch: string | undefined, pageNumber: number }>({ textSearch: undefined, pageNumber: 1 });
  albums = signal<Album[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | undefined>(undefined);
  loadCompleted = signal<boolean>(false);
  isLoadCompleted = computed<boolean>(() => this.isLoading() === false && this.albums()?.length > 0 && this.loadCompleted() === true);
  hasNoData = computed(() => this.albums()?.length === 0 && this.isLoading() === false && this.error() === undefined);
  shouldRetry = computed(() => this.isLoading() === false && this.error() !== undefined);

  private paramsSubject$ = new Subject<{ textSearch: string, pageNumber: number }>();
  private paramsObservable$: Observable<{ textSearch: string, pageNumber: number }>;
  private paramsSubscription: Subscription;

  private transloco = inject(TranslocoService);
  private uiUtilities = inject(UIUtilitiesService);
  private albumsService = inject(AlbumsService);

  ngOnInit(): void {
    this.params.set({ textSearch: undefined, pageNumber: 1 });
    this.albums.set([]);
    this.isLoading.set(false);
    this.error.set(undefined);
    this.loadCompleted.set(false);
    this.paramsObservable$ = this.paramsSubject$.asObservable();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  textSearchDidChange(textSearch: string): void {
    this.params.set({ textSearch, pageNumber: 1 });
    this.albums.set([]);
    this.paramsSubject$.next(this.params());
  }

  onScroll(): void {
    if (this.loadCompleted() === false) {
      this.paramsSubject$.next(this.params());
    }
  }

  loadData(): void {
    this.unsubscribeAll();

    this.paramsSubscription = this.paramsObservable$
      .pipe(
        startWith({ ...this.params() }),
        tap(() => this.isLoading.set(true)),
        tap(() => this.error.set(undefined)),
        debounceTime(50),
        switchMap(({ textSearch, pageNumber }) => {
          return this.albumsService.getAlbums(textSearch, pageNumber);
        }),
        tap(() => this.isLoading.set(false)),
        catchError(err => {
          this.isLoading.set(false);
          this.error.set(err);
          this.uiUtilities.modalAlert(
            this.transloco.translate('ALBUMS.ERROR_ACCESS_DATA'),
            err,
            this.transloco.translate('ALBUMS.CLOSE'),
          );
          return throwError(err);
        }),
      )
      .subscribe(data => {
        this.albums.update((a) => [...a, ...(data.albums)]);
        this.loadCompleted.set(data.lastPage);

        if (!this.loadCompleted()) {
          this.params.update(v => ({ ...v, pageNumber: v.pageNumber + 1 }));
        }
      });
  }

  retry(): void {
    this.loadData();
  }

  unsubscribeAll(): void {
    this.paramsSubscription?.unsubscribe();
  }
}

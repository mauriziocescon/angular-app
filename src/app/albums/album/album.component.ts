import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Album } from '../album.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  @Input() album: Album | undefined;

  constructor(protected translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}

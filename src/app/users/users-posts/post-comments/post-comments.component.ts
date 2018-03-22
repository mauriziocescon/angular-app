import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent implements OnInit {
  @Input() date: any[];

  constructor() {
  }

  ngOnInit() {
  }
}

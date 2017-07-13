import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-post-comments",
  templateUrl: "./post-comments.component.html",
  styleUrls: ["./post-comments.component.scss"]
})
export class PostCommentsComponent implements OnInit {

  @Input() post: any[];

  constructor() {
  }

  ngOnInit() {
    console.log("You must be undefined: PostCommentsComponent." + JSON.stringify(this.post));
  }
}

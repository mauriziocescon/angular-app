import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "users-posts",
  templateUrl: "./users-posts.component.html",
  styleUrls: ["./users-posts.component.scss"]
})
export class UsersPostsComponent implements OnInit {

  @Input() date: any[];

  constructor() {
  }

  ngOnInit() {
    // do nothing
  }
}

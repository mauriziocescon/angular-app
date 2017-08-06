import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-users-posts",
  templateUrl: "./users-posts.component.html",
  styleUrls: ["./users-posts.component.scss"]
})
export class UsersPostsComponent implements OnInit {

  @Input() post: any[];

  constructor() {
  }

  ngOnInit() {
    // do nothing
  }
}

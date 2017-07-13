import { Component, Input, OnInit } from "@angular/core";
import { post } from "selenium-webdriver/http";

@Component({
  selector: "app-users-posts",
  templateUrl: "./users-posts.component.html",
  styleUrls: ["./users-posts.component.scss"]
})
export class UsersPostsComponent implements OnInit {

  @Input() post: any[];

  constructor() {
    console.log("You must be undefined: UsersPostsComponent." + JSON.stringify(this.post));
  }

  ngOnInit() {
  }
}

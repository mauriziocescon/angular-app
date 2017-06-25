import { Component, OnDestroy, OnInit } from "@angular/core";

import { UsersService } from "./users.data-service";
import { User } from "./users.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit, OnDestroy {
  public textFilter: string;

  protected usersService: UsersService;
  protected usersRequest: any;
  protected users: User[];
  protected busy: boolean;

  constructor(UsersService: UsersService) {
    this.usersService = UsersService;
  }

  public get isLoadingData(): boolean {
    return this.busy === true;
  }

  public get hasNoData(): boolean {
    return this.users !== undefined && this.users.length === 0 && this.isLoadingData === false;
  }

  public get shouldRetry(): boolean {
    return this.users === undefined && this.isLoadingData === false;
  }

  public get showData(): boolean {
    return this.isLoadingData === false && this.hasNoData === false && this.shouldRetry === false;
  }

  public get dataSource(): User[] {
    return this.users;
  }

  public ngOnInit(): void {
    this.usersRequest = this.usersService.getUsers(this.textFilter)
      .subscribe(
        (users: User[]) => {
          this.users = users;
        },
        (err) => {
          console.error(err);
        },
        () => console.log("getUsers Complete"));
  }

  public ngOnDestroy(): void {
    this.usersRequest.unsubscribe();
  }
}

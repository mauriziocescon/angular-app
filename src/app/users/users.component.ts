import { Component, OnDestroy, OnInit } from "@angular/core";

import { TranslateService } from "ng2-translate";

import { UsersService } from "./users.data-service";
import { User } from "./users.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit, OnDestroy {
  public textFilter: string;

  protected translate: TranslateService;
  protected usersService: UsersService;
  protected usersRequest: any;
  protected users: User[];
  protected busy: boolean;

  constructor(TranslateService: TranslateService,
              UsersService: UsersService) {
    this.translate = TranslateService;
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

  public resetTextFilter(): void {
    if (this.textFilter === undefined) {
      return;
    }

    this.textFilter = undefined;
    this.loadDataSource();
  }

  public textFilterDidChange(newValue: string): void {
    console.log(this.textFilter + " " + newValue);
    // this.delayExecutionService.execute(() => {
    //   this.loadDataSource();
    // }, this.loadUsersKey, 1500);
  }

  public loadDataSource(): void {
    // this.busy = true;
    // this.users = undefined;
    //
    // this.usersService.getUsers(this.textFilter).then((response: ResponseWs<User[]>) => {
    //
    //   if (response.isSuccess()) {
    //     this.users = response.getData();
    //   }
    //   else if (response.hasBeenCanceled() === false) {
    //     // we do not notify the user in case of cancel request
    //     this.uiUtilitiesService.modalAlert(this.localizedStringService.getLocalizedString("ERROR_ACCESS_DATA"), response.getMessage(), this.localizedStringService.getLocalizedString("CLOSE"));
    //   }
    // }).catch((reason: any) => {
    //   this.uiUtilitiesService.modalAlert(this.localizedStringService.getLocalizedString("ERROR_ACCESS_DATA_COMPONENT"), reason.toString(), this.localizedStringService.getLocalizedString("CLOSE"));
    //   Logger.log(reason);
    // }).finally(() => {
    //   this.busy = false;
    // });
  }
}

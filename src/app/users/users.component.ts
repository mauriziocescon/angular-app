import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";

import "rxjs/Rx";
import { TranslateService } from "ng2-translate";

import { UsersService } from "./users.data-service";
import { User } from "./users.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit, OnDestroy {
  protected formBuilder: FormBuilder;
  public searchForm: FormGroup;
  protected searchControl: FormControl;

  protected translate: TranslateService;
  protected usersService: UsersService;
  protected usersRequest: any;
  protected users: User[] | undefined;
  protected busy: boolean;

  // todo: remove it when you're done
  public date: any;

  constructor(formBuilder: FormBuilder,
              translateService: TranslateService,
              usersService: UsersService) {
    this.formBuilder = formBuilder;
    this.translate = translateService;
    this.usersService = usersService;
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

  public get dataSource(): User[] | undefined {
    return this.users;
  }

  public get isTextFilterNotEmpty(): boolean {
    return this.searchControl.value;
  }

  public ngOnInit(): void {
    this.busy = false;

    this.searchForm = this.formBuilder.group({
      textFilter: this.searchControl = new FormControl(),
    });

    this.loadDataSource();
  }

  public ngOnDestroy(): void {
    if (this.usersRequest) {
      this.usersRequest.unsubscribe();
    }
  }

  public resetTextFilter(): void {
    if (this.searchControl.value === undefined) {
      return;
    }

    this.searchControl.setValue(undefined);
    this.loadDataSource();
  }

  public trackByUser(index: number, user: User): number {
    return user.id;
  }

  public loadDataSource(): void {
    this.usersRequest = this.searchControl
      .valueChanges
      .startWith("")
      .debounceTime(400)
      .do(() => this.busy = true)
      .switchMap(textSearch => this.usersService.getUsers(textSearch))
      .do(() => this.busy = false)
      .subscribe(
        (users: User[]) => {
          this.users = users;
          this.date = new Date();
        },
        (err: string) => {
          this.busy = false;
          this.users = undefined;
          alert(err);
        },
        () => {
          console.log("getUsers Completed");
        });
  }
}

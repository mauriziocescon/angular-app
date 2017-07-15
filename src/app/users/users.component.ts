import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";

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
  protected users: User[];
  protected busy: boolean;

  public post: any[];

  constructor(FormBuilder: FormBuilder,
              TranslateService: TranslateService,
              UsersService: UsersService) {
    this.formBuilder = FormBuilder;
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

  public isTextFilterNotEmpty(): boolean {

    console.log(this.searchControl.value);
    return this.searchControl.value;
  }

  public ngOnInit(): void {
    this.post = [
      {
        id: "1",
        comment: {
          id: 1,
          text: "one"
        }
      }];

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
    this.busy = true;
    this.users = undefined;

    this.usersRequest = this.searchControl
      .valueChanges
      .startWith("")
      .debounceTime(400)
      .switchMap(term => this.usersService.getUsers(term))
      .subscribe(
        (users: User[]) => {
          this.busy = false;
          this.users = users;
          this.post[0].comment.text = new Date().getTime().toString();
        },
        (err) => {
          this.busy = false;
          alert("error");
        },
        () => console.log("getUsers Complete"));
  }
}

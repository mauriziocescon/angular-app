import { Injectable } from "@angular/core";

import * as Constants from "./app-constants.model";

@Injectable()
export class AppConstantsService {
  protected application: Constants.Application;
  protected languages: Constants.Languages;

  constructor() {
    this.application = new Constants.Application();
    this.languages = new Constants.Languages();
  }

  public get Application(): Constants.Application {
    return this.application;
  }

  public get Languages(): Constants.Languages {
    return this.languages;
  }
}

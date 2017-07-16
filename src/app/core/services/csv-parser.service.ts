import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import * as Papa from "papaparse";

import { AppConstantsService } from "./app-constants.service";
import ParseError = PapaParse.ParseError;

@Injectable()
export class CsvParserService {
  protected http: Http;
  protected appConstants: AppConstantsService;

  constructor(http: Http,
              appConstantsService: AppConstantsService) {
    this.http = http;
    this.appConstants = appConstantsService;
  }

  public parse(): void {

    this.http.get("assets/csv/test.csv", {})
      .switchMap(res => res.text())
      .subscribe(
        (text) => {
          Papa.parse(text, {
            worker: true,
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            error: (error: ParseError, file?: File) => {
              console.log("Papa.parse error: \n\n", error.message);
            },
            complete: (results) => {
              console.log("Papa.parse finished: \n\n", results.data);
            },
          });
        },
        (err) => {
          console.log("test.csv error: " + err);
        },
        () => {
          console.log("test.csv request complete");
        },
      );
  }
}

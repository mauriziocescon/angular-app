import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import * as Papa from "papaparse";

import { AppConstantsService } from "./app-constants.service";
import ParseError = PapaParse.ParseError;

@Injectable()
export class CsvParserService {
  protected http: HttpClient;
  protected appConstants: AppConstantsService;

  constructor(http: HttpClient,
              appConstantsService: AppConstantsService) {
    this.http = http;
    this.appConstants = appConstantsService;
  }

  public parse(): void {

    // this.http.get<any>("assets/csv/test.csv")
    //   .switchMap(data => data)
    //   .subscribe(
    //     (text) => {
    //       Papa.parse(text, {
    //         worker: true,
    //         header: true,
    //         dynamicTyping: true,
    //         skipEmptyLines: true,
    //         error: (error: ParseError, file?: File) => {
    //           console.log("Papa.parse error: \n\n", error.message);
    //         },
    //         complete: (results) => {
    //           console.log("Papa.parse finished: \n\n", results.data);
    //         },
    //       });
    //     },
    //     (err) => {
    //       console.log("test.csv error: " + err);
    //     },
    //     () => {
    //       console.log("test.csv request complete");
    //     },
    //   );
  }
}

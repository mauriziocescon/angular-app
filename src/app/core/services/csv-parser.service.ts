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
      // .switchMap((res: Response) => {
      //   return res.text();
      // })
      .subscribe(
        (data) => {

          console.log("ciao" + data.text());

          Papa.parse(data.text(), {
            worker: true,
            header: true,
            error: (error: ParseError, file?: File) => {
              console.log("error:", error.message);
            },
            complete: (results) => {
              console.log("Finished: \n\n", results.data);
            },
          });
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log("Request Complete");
        },
      );
  }
}

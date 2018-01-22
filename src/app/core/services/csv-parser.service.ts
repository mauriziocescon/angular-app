import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import * as Papa from "papaparse";
import { NGXLogger } from "ngx-logger";

import { AppConstantsService } from "./app-constants.service";
import ParseError = PapaParse.ParseError;

@Injectable()
export class CsvParserService {

  constructor(protected http: HttpClient,
              protected logger: NGXLogger,
              protected appConstants: AppConstantsService) {
  }

  parse(): void {

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
    //           this.logger.log("Papa.parse error: \n\n", error.message);
    //         },
    //         complete: (results) => {
    //           this.logger.log("Papa.parse finished: \n\n", results.data);
    //         },
    //       });
    //     },
    //     (err) => {
    //       this.logger.log("test.csv error: " + err);
    //     },
    //     () => {
    //       this.logger.log("test.csv request complete");
    //     },
    //   );
  }
}

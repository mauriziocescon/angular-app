import { Injectable } from '@angular/core';

import { AppConstantsService } from './app-constants.service';

@Injectable()
export class UtilitiesService {

  constructor(protected appConstants: AppConstantsService) {
  }

  /**
   * Return params of a url
   *
   * @param url
   */
  parseQueryString(url: string): any {
    const urlParams: { [key: string]: string } = {};

    url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), (substring: string, ...args: any[]) => {
      return urlParams[args[0]] = args[2];
    });

    return urlParams;
  }

  /**
   * Parse link property
   * inside headers
   *
   * @param headers
   */
  parseLinkHeaders(headers: any): any {
    if (headers && headers.get('link') && headers.get('link').length === 0) {
      throw new Error('input must not be of zero length');
    }

    // Split parts by comma
    const parts = headers.get('link').split(',');
    const links: { [key: string]: string } = {};

    if (parts.length > 1) {
      // Parse each part into a named link
      for (const part of parts) {
        const section = part.split(';');
        if (section.length !== 2) {
          throw new Error('section could not be split on \';\'');
        }
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
      }
    }

    return links;
  }
}

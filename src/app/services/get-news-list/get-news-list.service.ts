import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NewsResponse } from "../../types";
import { takeUntil } from "rxjs/operators";
import { UnsubscribeService } from "../utility/unsubscribe-service/unsubscribe.service";


@Injectable({
  providedIn: 'root'
})
export class GetNewsListService {
  protected ngUnsubscribe$: UnsubscribeService;

  constructor(
    private http: HttpClient,
    protected injector: Injector,) {
    this.ngUnsubscribe$ = injector.get(UnsubscribeService);
  }

  getParametersFrontPage(testUrl: string,
  ) {
    return this.http.get<NewsResponse>(testUrl)
      .pipe(takeUntil(this.ngUnsubscribe$));
  }

  getAllFrontNews(url: string,
                  numberOfNews: number,
                  urlFrontPage: string,
                  ) {
    let modifyUrl: string = `${url}${numberOfNews}${urlFrontPage}`;
    return this.http.get<NewsResponse>(modifyUrl)
      .pipe(takeUntil(this.ngUnsubscribe$));
  }

  getNewsBySearchQuery(url: string,
                  numberOfNews: number,
                  requestTag: string,
                  searchQuery: string,
  ) {
    let modifyUrl: string = `${url}${numberOfNews}${requestTag}${searchQuery}`;
    return this.http.get<NewsResponse>(modifyUrl)
      .pipe(takeUntil(this.ngUnsubscribe$));
  }
}

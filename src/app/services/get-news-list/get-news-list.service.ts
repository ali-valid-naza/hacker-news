import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { News, NewsResponse } from "../../types";
import { takeUntil } from "rxjs/operators";
import { UnsubscribeService } from "../utility/unsubscribe-service/unsubscribe.service";
import { MatTableDataSource } from '@angular/material/table';
import { FRONT_PAGE_URL_PER_PAGE_0, TAGS_FRONT_PAGE, TAGS_STORY, URL_HITS_PER_PAGE } from '../../app.constants';
import { MatPaginator } from '@angular/material/paginator';
import { TransitDataService } from '../utility/transit-data-service/transit-data.service';


@Injectable({
  providedIn: 'root'
})
export class GetNewsListService {
  protected ngUnsubscribe$: UnsubscribeService;

  frontPageUrlPerPage0 = FRONT_PAGE_URL_PER_PAGE_0;
  urlHitsPerPage = URL_HITS_PER_PAGE;
  tagsFrontPage = TAGS_FRONT_PAGE;
  mapNewsObjectIdNewsText: any = new Map();
  previousUrl: string = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';
  urlStoryTags = TAGS_STORY;

  constructor(
    private http: HttpClient,
    private transitDataService: TransitDataService,
    protected injector: Injector,) {
    this.ngUnsubscribe$ = injector.get(UnsubscribeService);
  }

  getParametersFrontPage(testUrl: string,
                         dataSource: MatTableDataSource<News>
  ) {
    return this.http.get<NewsResponse>(testUrl)
      .pipe(takeUntil(this.ngUnsubscribe$));
  }

  getAllFrontNews(url: string,
                  numberOfNews: number,
                  urlFrontPage: string,
  ) {
    let modifyUrl: string = `${url}${numberOfNews}${urlFrontPage}`;
    console.log(modifyUrl);
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

  devFetchFrontNews(dataSource: MatTableDataSource<News>) {
    this.getParametersFrontPage(
      this.frontPageUrlPerPage0,
      dataSource
    ).pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(v => {
        this.getAllFrontNews(this.urlHitsPerPage, v.nbHits, this.tagsFrontPage)
          .subscribe(v => {
            dataSource.data = v.hits;
            this.transitData(dataSource.data);
          });
      });
  }

  devFetchPreviousData(dataSource: MatTableDataSource<News>) {
    this.getParametersFrontPage(
      this.previousUrl,
      dataSource
    ).pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(v => {
        this.getAllFrontNews(this.urlHitsPerPage, v.nbHits, this.urlStoryTags)
          .subscribe(v => {
            dataSource.data = v.hits
              .filter((v) => !v._tags.includes('front_page'))
              .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
            this.transitData(dataSource.data);
          });
      });
  }

  transitData(v: News[]) {
    v.forEach(v => this.mapNewsObjectIdNewsText.set(v.objectID, v.story_text));
    this.transitDataService.emitData(this.mapNewsObjectIdNewsText);
  }
}

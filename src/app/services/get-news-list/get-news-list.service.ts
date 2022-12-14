import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { News, NewsResponse } from "../../types";
import { takeUntil, tap } from "rxjs/operators";
import { UnsubscribeService } from "../utility/unsubscribe-service/unsubscribe.service";
import { MatTableDataSource } from '@angular/material/table';
import {
  FRONT_PAGE_URL_PER_PAGE_0,
  PREVIOUS_URL_NEWS,
  SEARCH_PER_AGE_0,
  TAGS_FRONT_PAGE,
  TAGS_QUERY,
  TAGS_STORY,
  URL_HITS_PER_PAGE
} from '../../app.constants';
import { TransitDataService } from '../utility/transit-data-service/transit-data.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetNewsListService {
  protected ngUnsubscribe$: UnsubscribeService;

  frontPageUrlPerPage0: string = FRONT_PAGE_URL_PER_PAGE_0;
  urlHitsPerPage: string = URL_HITS_PER_PAGE;
  tagsFrontPage: string = TAGS_FRONT_PAGE;
  previousUrl: string = PREVIOUS_URL_NEWS;
  urlStoryTags: string = TAGS_STORY;
  searchUrlPerPage0: string = SEARCH_PER_AGE_0;
  tagQuery: string = TAGS_QUERY;

  mapNewsObjectIdNewsText: any = new Map();

  devFrontNewsUrl: string = 'http://hn.algolia.com/api/v1/search?tags=front_page';

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

  fetchFrontNews(dataSource: MatTableDataSource<News>) {
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

  fetchPreviousNews(dataSource: MatTableDataSource<News>) {
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

  fetchNewsByQuery(searchQuery: string, dataSource: MatTableDataSource<News>) {
    this.getParametersFrontPage(
      `${this.searchUrlPerPage0}${searchQuery}`,
      dataSource
    ).pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(v => {
        this.getNewsBySearchQuery(this.urlHitsPerPage,
          v.nbHits, this.tagQuery, searchQuery).subscribe(v => {
          dataSource.data =
            v.hits
              .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

          this.transitData(dataSource.data);
        });
      });
  }

  transitData(v: News[]) {
    v.forEach(v => this.mapNewsObjectIdNewsText.set(v.objectID, v.story_text));
    this.transitDataService.emitData(this.mapNewsObjectIdNewsText);
  }

  getNews(url: string, tag: string, page: number): Observable<NewsResponse> {
    const requestUrl = `${url}?page=${page + 1}&${tag}`;
    return this.http.get<NewsResponse>(requestUrl)
  }
}

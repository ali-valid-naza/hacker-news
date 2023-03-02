import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, } from 'rxjs/operators';
import { NewsService } from '../news.service';
import { NewsResponse } from '../types';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit{
  title = 'news-list';
  pageSizes = this.newsService.pageSizes;
  selectedButton = 2;

  newsTag$ = this.newsService.newsTag$;
  news$ = this.newsService.news$;

  currentPage$ = this.newsService.currentPage$;

  totalResults$ = this.newsService.totalResults$
  totalPages$ = this.newsService.totalPages$

  disablePrevious$: Observable<boolean> = this.currentPage$
    .pipe(
      map(pageNumber => pageNumber === 0)
    );

  disableNext$: Observable<boolean> = combineLatest([
    this.currentPage$,
    this.totalPages$
  ]).pipe(
    map(([currentPage, totalPages]) => currentPage === totalPages)
  );

  view$ = combineLatest([
    this.currentPage$,
    this.newsTag$,
    this.totalResults$,
    this.totalPages$,
    this.news$,
  ]).pipe(
    map(([currentPage, newsTag, totalResults, totalPages, news,]:
           [number, string, number, number, NewsResponse]) => ({
      currentPage, newsTag, totalResults, totalPages, news
    })),
    // tap((v) => console.log(v)),
  );

  constructor(
    route: ActivatedRoute,
    public newsService: NewsService) {
    route.params.subscribe((v: { [x: string]: string; }) => {
      // console.log(v);
      this.newsService.setNewsTag(v['newsTag']);
    });
  }
  ngOnInit(): void {
    this.totalResults$.subscribe()
  }

  setPage(pageIndex: number) {
    this.newsService.incrementPageIndex(pageIndex);
    // this.view$.subscribe(() =>)
  }

  setPageSize(pageSize: number): void {
    this.selectedButton = pageSize;
    this.newsService.changePageSize(pageSize);
  }
}

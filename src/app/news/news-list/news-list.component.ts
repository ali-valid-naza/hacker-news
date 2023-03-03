import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable,  } from 'rxjs';
import {  map, tap, } from 'rxjs/operators';
import { NewsService } from '../news.service';
import { News, NewsResponse } from '../types';
import { forkJoin } from 'rxjs';
import { zip } from 'rxjs';
import { race } from 'rxjs';


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
  newsResponse$ = this.newsService.newsResponse$;

  currentPageIndex$ = this.newsService.currentPageIndex$;

  totalResults$ = this.newsService.totalResults$
  totalPages$ = this.newsService.totalPages$

  disablePrevious$: Observable<boolean> = this.currentPageIndex$
    .pipe(
      map(pageNumber => pageNumber === 0)
    );

  disableNext$: Observable<boolean> = combineLatest([
    this.currentPageIndex$,
    this.totalPages$
  ]).pipe(
    map(([currentPage, totalPages]) => currentPage === totalPages)
  );

  // view$ = combineLatest([
  //   this.currentPageIndex$,
  //   this.newsTag$,
  //   this.totalResults$,
  //   this.totalPages$,
  //   this.newsResponse$,
  // ]).pipe(
  //   // tap(console.log),
  //   map(([currentPage, newsTag, totalResults, totalPages, news,]:
  //          [number, string, number, number, NewsResponse]) => ({
  //     currentPage, newsTag, totalResults, totalPages, news
  //   })),
  //   // tap((v) => console.log(v)),
  // );
  totalNews$ = this.newsService.totalNews$

  view$ = combineLatest([
    this.totalResults$,
    this.currentPageIndex$,
    this.totalNews$,
  ]).pipe(
    tap(console.log),
    map(([totalPages, currentPage, news]: [ number, number, News[]]) => ({
      totalPages, currentPage, news
    })),
  )

  // viewNews$ = this.newsService.viewNews$
  disabledNext: boolean = false


  constructor(
    route: ActivatedRoute,
    public newsService: NewsService) {
    route.params.subscribe((v: { [x: string]: string; }) => {
      // console.log(v);
      this.newsService.setNewsTag(v['newsTag']);
    });
  }
  ngOnInit(): void {
    this.view$.subscribe()
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

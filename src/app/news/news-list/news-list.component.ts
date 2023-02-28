
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, } from 'rxjs/operators';
import { NewsService } from '../news.service';
import { NewsResponse } from '../types';



@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent {
  title = 'news-list';
  pageSizes = this.newsService.pageSizes;
  selectedButton = 2;

  newsTag$ = this.newsService.newsTag$;
  news$ = this.newsService.news$;

  currentPage$ = this.newsService.currentPage$;



  view$ = combineLatest([
    this.currentPage$,
    this.newsTag$,
    this.news$,
  ]).pipe(
    // @ts-ignore
    map(([currentPage, newsTag, news,]:
           [number, string, NewsResponse]) => ({
      currentPage, newsTag, news
    }))
  );

  constructor(
    route: ActivatedRoute,
    public newsService: NewsService) {
    route.params.subscribe((v) => {
      // console.log(v);
      this.newsService.setNewsTag(v['newsTag']);
    });
  }

  setPage(pageIndex: number) {
    this.newsService.incrementPageIndex(pageIndex);
  }

  setPageSize(pageSize: number): void {
    this.selectedButton = pageSize;
    this.newsService.changePageSize(pageSize);
  }
}

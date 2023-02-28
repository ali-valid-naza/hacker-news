import { Component } from '@angular/core';
import { NewsService } from '../news.service';
import { ActivatedRoute } from '@angular/router';

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

  currentPage$ = this.newsService.currentPage$
  currentPage: number = 0;

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

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
  pageIndex$ = this.newsService.pageIndex$;
  news$ = this.newsService.news$;

  constructor(
    route: ActivatedRoute,
    private newsService: NewsService) {
    route.params.subscribe((v) => {
      this.newsService.setNewsTag(v['newsTag']);
    });
  }

  setPageSize(pageSize: number): void {
    this.selectedButton = pageSize;
    this.newsService.changePageSize(pageSize);
  }
}

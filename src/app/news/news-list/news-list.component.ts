import { Component } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent {
  title = 'news-list';
  pageSizes = this.newsService.pageSizes;
  selectedButton = 2;

  configNewsFront$ = this.newsService.configNewsFront$;
  pageIndex$ = this.newsService.pageIndex$;
  news$ = this.newsService.news$;

  constructor(private newsService: NewsService) {
  }

  setPageSize(pageSize: number): void {
    this.selectedButton = pageSize;
    this.newsService.changePageSize(pageSize);
  }
}

import { Component, OnInit } from '@angular/core';
import { NewsService } from './news/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'news-list';
  pageSizes = this.newsService.pageSizes;
  selectedButton = 2;

  configNewsFront$ = this.newsService.configNewsFront$;
  pageIndex$ = this.newsService.pageIndex$;
  news$ = this.newsService.news$;

  constructor(private newsService: NewsService) {
  }

  ngOnInit(): void {
    // this.news$.subscribe((v) => console.log(v))
  }
}

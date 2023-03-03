import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../news/news.service';
import { LocationStrategy } from '@angular/common';
import { DevNewsServiceService } from '../../dev/dev-news-service.service';

@Component({
  selector: 'app-comments-tree',
  templateUrl: './comments-tree.component.html',
  styleUrls: ['./comments-tree.component.css']
})
export class CommentsTreeComponent implements OnInit{
  currentPageIndex$ = this.newsService.currentPageIndex$
  currentPage: number = 0

  constructor(
    private newsService: DevNewsServiceService,
    private location: LocationStrategy,
    ) {
    // console.log(history.state);
    this.currentPageIndex$.subscribe((v) => {
      // console.log(v);
      this.currentPage = v;
    })
  }
  ngOnInit() {
    this.location.onPopState((v) => {
      // console.log(v);
    })
  }
}

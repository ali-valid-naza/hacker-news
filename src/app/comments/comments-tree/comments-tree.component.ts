import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../news/news.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-comments-tree',
  templateUrl: './comments-tree.component.html',
  styleUrls: ['./comments-tree.component.css']
})
export class CommentsTreeComponent implements OnInit{
  currentPage$ = this.newsService.currentPage$
  currentPage: number = 0

  constructor(
    private newsService: NewsService,
    private location: LocationStrategy,
    ) {
    // console.log(history.state);
    this.currentPage$.subscribe((v) => {
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

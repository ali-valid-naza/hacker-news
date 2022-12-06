import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { News } from '../../types';
import { GetNewsListService } from '../../services/get-news-list/get-news-list.service';

@Component({
  selector: 'app-front-news',
  templateUrl: './front-news.component.html',
  styleUrls: ['./front-news.component.scss']
})
export class FrontNewsComponent implements OnInit {
  dataSource = new MatTableDataSource<News>();


  constructor(
    private getNewsListService: GetNewsListService,
  ) {
  }

  ngOnInit(): void {
    this.getFrontNews(this.dataSource);
  }

  getFrontNews(dataSource: MatTableDataSource<News>) {
    this.getNewsListService.fetchFrontNews(dataSource);
  }
}

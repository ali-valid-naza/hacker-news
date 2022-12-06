import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { News } from '../../types';
import { GetNewsListService } from '../../services/get-news-list/get-news-list.service';

@Component({
  selector: 'app-previous-news',
  templateUrl: './previous-news.component.html',
  styleUrls: ['./previous-news.component.scss']
})
export class PreviousNewsComponent implements OnInit {
  dataSource = new MatTableDataSource<News>();

  constructor(
    private getNewsListService: GetNewsListService,
  ) {
  }

  ngOnInit(): void {
    this.getPreviousNews(this.dataSource);
  }

  getPreviousNews(dataSource: MatTableDataSource<News>) {
    this.getNewsListService.fetchPreviousNews(dataSource);
  }
}

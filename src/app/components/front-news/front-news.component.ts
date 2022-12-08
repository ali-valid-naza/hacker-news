import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { News, NewsResponse } from '../../types';
import { GetNewsListService } from '../../services/get-news-list/get-news-list.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-front-news',
  templateUrl: './front-news.component.html',
  styleUrls: ['./front-news.component.scss']
})
export class FrontNewsComponent implements OnInit {
  dataSource = new MatTableDataSource<News>();

  devDataSource$: Observable<[News]>;


  constructor(
    private getNewsListService: GetNewsListService,
  ) {
  }

  ngOnInit(): void {
    this.getFrontNews(this.dataSource);

    // this.getNewsListService.devGetFrontNews().subscribe()

    // this.devDataSource$ = this.getNewsListService.devGetFrontNews()
    //   .pipe(map(v => v.hits))
  }

  getFrontNews(dataSource: MatTableDataSource<News>) {
    this.getNewsListService.fetchFrontNews(dataSource);
  }
}

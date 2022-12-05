import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { News } from "../../types";
import { GetNewsListService } from "../../services/get-news-list/get-news-list.service";
import { LoadingService } from "../../services/utility/loading-service/loading.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, AfterViewInit {
  $loading = this.loader.$loading;
  displayedColumns: string[] = [
    'title', 'points', 'author',
    'url', 'num_comments', 'created_at',
  ];
  dataSource = new MatTableDataSource<News>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private getNewsListService: GetNewsListService,
    private loader: LoadingService,
  ) {
  }

  ngOnInit(): void {
    this.getFrontNews(this.dataSource);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getFrontNews(dataSource: MatTableDataSource<News>) {
    this.getNewsListService.fetchFrontNews(dataSource);
  }

  getPreviousNews(dataSource: MatTableDataSource<News>) {
    this.getNewsListService.fetchPreviousNews(dataSource);
  }

  getNewsBySearchQuery(searchQuery: string, dataSource: MatTableDataSource<News>) {
    this.getNewsListService.fetchNewsByQuery(searchQuery, dataSource);
  }
}

import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { News } from '../../types';
import { MatPaginator } from '@angular/material/paginator';
import { LoadingService } from '../../services/utility/loading-service/loading.service';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.scss']
})
export class ListNewsComponent implements AfterViewInit {
  @Input() dataSource: MatTableDataSource<News>;
  displayedColumns: string[] = [
    'title', 'points', 'author',
    'url', 'num_comments', 'created_at',
  ];
  $loading = this.loader.$loading;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private loader: LoadingService,) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

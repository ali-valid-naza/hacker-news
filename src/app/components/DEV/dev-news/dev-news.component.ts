import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { GetNewsListService } from '../../../services/get-news-list/get-news-list.service';
import { News } from '../../../types';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap, } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dev-news',
  templateUrl: './dev-news.component.html',
  styleUrls: ['./dev-news.component.scss']
})
export class DevNewsComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['title', 'author', 'points', 'source'];
  subscriptionRequest: Subscription;
  data: News[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  devDataSource$: Observable<[News]>;

  constructor(private getNewsListService: GetNewsListService,) {
  }

  ngAfterViewInit(): void {
    this.subscriptionRequest = this.paginator.page
      .pipe(
        startWith(null),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getNewsListService.devGetFrontNews(
            this.paginator.pageIndex - 1,
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.nbHits;
          return data.hits;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  ngOnDestroy(): void {
    this.subscriptionRequest.unsubscribe();
  }
}

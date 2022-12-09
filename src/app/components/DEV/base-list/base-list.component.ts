import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { News } from '../../../types';
import { MatPaginator } from '@angular/material/paginator';
import { GetNewsListService } from '../../../services/get-news-list/get-news-list.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})
export class BaseListComponent implements AfterViewInit {
  protected displayedColumns: string[] = ['title', 'author', 'points', 'source', 'created_at',];
  protected subscriptionRequest: Subscription;
  protected data: News[] = [];
  protected url: string = '';
  protected tag: string = '';

  protected resultsLength = 0;
  protected isLoadingResults = true;
  protected isRateLimitReached = false;

  @ViewChild(MatPaginator) protected paginator: MatPaginator;

  constructor(public getNewsListService: GetNewsListService,) {
  }

  ngAfterViewInit(): void {
    this.subscriptionRequest = this.paginator.page
      .pipe(
        startWith(null),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getNewsListService.devGetFrontNews(
            this.url,
            this.tag,
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

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { News } from '../../types';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GetNewsListService } from '../../services/get-news-list/get-news-list.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})
export class BaseListComponent implements OnInit, AfterViewInit {
  protected displayedColumns: string[] = ['title', 'author', 'points', 'source', 'created_at',];
  protected subscriptionRequest: Subscription;
  protected data: News[] = [];
  protected url: string = '';
  protected tag: string = '';

  protected resultsLength = 0;
  protected isLoadingResults = true;
  protected isRateLimitReached = false;
  protected pageIndex: number = 0;
  protected pageSize: number = 20;
  protected pageEvent: PageEvent;
  protected routeUrl: string;


  @ViewChild(MatPaginator) protected paginator: MatPaginator;

  constructor(
    public getNewsListService: GetNewsListService,
    protected route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.url.subscribe((v) => {
      this.pageIndex = Number(v[1].path);
      this.routeUrl = `/${v[0].path}`;
    });
  }


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.resultsLength = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  ngAfterViewInit(): void {
    this.subscriptionRequest = this.paginator.page
      .pipe(
        startWith(null),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getNewsListService.getNews(
            this.url,
            this.tag,
            this.pageIndex - 1,
          ).pipe(catchError(() => of(null)));
        }),
        map(data => {
          // setTimeout(() => {
          //   this.isLoadingResults = false;
          //   this.isRateLimitReached = data === null;
          // }, 0)
          Promise.resolve().then(() => {
            this.isLoadingResults = false;
            this.isRateLimitReached = data === null;
          });

          if (data === null) {
            return [];
          }
          Promise.resolve().then(() => this.resultsLength = data.nbHits);
          // setTimeout(() => {
          //   this.resultsLength = data.nbHits;
          // }, 0)
          return data.hits;
        }),
      )
      .subscribe(data => {
        setTimeout(() => {
          this.data = data;
        }, 0);
      });
  }

  ngOnDestroy(): void {
    this.subscriptionRequest.unsubscribe();
  }
}

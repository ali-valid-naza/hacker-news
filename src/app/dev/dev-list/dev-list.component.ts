import { Component, OnInit } from '@angular/core';
import { DevNewsServiceService } from '../dev-news-service.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dev-list',
  templateUrl: './dev-list.component.html',
  styleUrls: ['./dev-list.component.css']
})
export class DevListComponent {
  title = 'news-list';
  pageSizes = this.newsService.pageSizes;
  selectedButton = 2;
  newsView$ = this.newsService.newsView$;
  currentPageIndex$ = this.newsService.currentPageIndex$;

  disablePrevious$: Observable<boolean> = this.currentPageIndex$
    .pipe(
      map(pageNumber => pageNumber === 0)
    );


  constructor(
    private newsService: DevNewsServiceService,) {
  }

  setPage(pageIndex: number) {
    this.newsService.incrementPageIndex(pageIndex);
  }

  setPageSize(pageSize: number): void {
    this.selectedButton = pageSize;
    this.newsService.changePageSize(pageSize);
  }
}

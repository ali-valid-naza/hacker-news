import { Component, OnInit } from '@angular/core';
import { DevNewsServiceService } from '../dev-news-service.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-dev-list',
  templateUrl: './dev-list.component.html',
  styleUrls: ['./dev-list.component.css']
})
export class DevListComponent implements OnInit {
  title = 'news-list';
  pageSizes = this.newsService.pageSizes;
  selectedButton = 2;
  newsView$ = this.newsService.newsView$
  currentPageIndex$ = this.newsService.currentPageIndex$;
  totalPagesView$ = this.newsService.totalPagesView$

  disablePrevious$: Observable<boolean> = this.currentPageIndex$
    .pipe(
      map(pageNumber => pageNumber === 0)
    );

  // disableNext$: Observable<boolean> = combineLatest([
  //   this.currentPageIndex$,
  //   this.totalPagesView$
  // ]).pipe(
  //   map(([currentPage, totalPages]) => {
  //     // console.log(currentPage);
  //     // console.log(totalPages);
  //     return currentPage === totalPages;
  //   })
  // );

  constructor(
   private route: ActivatedRoute,
    private newsService: DevNewsServiceService,
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((v: { [x: string]: string; }) => {
      this.newsService.setNewsTag(v['newsTag']);
    });
    // this.newsResponseConfig$.subscribe();
    // this.newsView$.subscribe()
  }

  setPage(pageIndex: number) {
    this.newsService.incrementPageIndex(pageIndex);
  }

  setPageSize(pageSize: number): void {
    this.selectedButton = pageSize;
    this.newsService.changePageSize(pageSize);
  }
}

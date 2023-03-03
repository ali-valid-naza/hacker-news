import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, map, scan, shareReplay, switchMap, take, takeLast, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { NewsResponse } from '../news/types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevNewsServiceService {
  pageSizes = [2, 3, 25];
  private newsUrl: string = 'http://hn.algolia.com/api/v1/search?';

  private pageIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private pageSizeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.pageSizes[2]);
  pageSizeAction$ = this.pageSizeSubject.asObservable();

  private newsTagSubject: BehaviorSubject<string> = new BehaviorSubject('front_page');
  newsTag$ = this.newsTagSubject.asObservable();

  private totalPagesViewSubject: Subject<number> = new Subject()
  totalPagesViewDev$ = this.totalPagesViewSubject.asObservable()


  currentPageIndex$ = this.pageIndexSubject
    .pipe(
      // @ts-ignore
      scan((acc, one) => {
        if (one === 0) {
          return 0;
        } else {
          return acc + one;
        }
      }),
      // shareReplay(1),
    );

  newsView$ = combineLatest([
    this.newsTag$,
    this.currentPageIndex$,
    this.pageSizeAction$,
  ]).pipe(
    switchMap(([tag, page, hitsPerPage,]) =>
      this.http.get<NewsResponse>(this.newsUrl, {
        params: {
          tags: tag,
          page: page.toString(),
          hitsPerPage: hitsPerPage.toString(),
        }
      })
        .pipe(
          takeLast(1),
          tap(console.log))
    )
  );

  totalPagesAllNews$ = this.newsView$.pipe(
    map((v: NewsResponse) => v.nbHits)
  );

  totalPagesView$ = combineLatest([
    this.totalPagesAllNews$,
    this.pageSizeAction$
  ]).pipe(
    map(([total, pageSize]) => Math.ceil(total / pageSize) - 1)
  );

  constructor(private http: HttpClient) {
  }

  changePageSize(size: number): void {
    this.pageSizeSubject.next(size);
    this.incrementPageIndex(0);
  }

  incrementPageIndex(index: number) {
    this.pageIndexSubject.next(index);
  }

  reinitializePageIndexSubject() {
    this.pageIndexSubject.next(0);
  }

  setNewsTag(tag: string) {
    this.newsTagSubject.next(tag);
    this.incrementPageIndex(0);
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${ err.error.message }`;
    } else {
      errorMessage = `Backend returned code ${ err.status }: ${ err.body.error }`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}

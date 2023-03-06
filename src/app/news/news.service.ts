import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, map, scan, shareReplay, takeLast } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject, throwError } from 'rxjs';
import { NewsResponse } from './types';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  pageSizes = [3, 5, 10, 25];
  private newsUrl: string = 'https://hn.algolia.com/api/v1/search?';


  private pageIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private pageSizeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.pageSizes[2]);
  pageSizeAction$ = this.pageSizeSubject.asObservable();

  private newsTagSubject: BehaviorSubject<string> = new BehaviorSubject('front_page');
  newsTag$ = this.newsTagSubject.asObservable();

  private totalPagesViewSubject: Subject<number> = new Subject();
  totalPagesViewDev$ = this.totalPagesViewSubject.asObservable();

  currentPageIndex$ = this.pageIndexSubject
    .pipe(
      scan((acc, one) => {
        if (one === 0) {
          return 0;
        } else {
          return acc + one;
        }
      }),
      shareReplay(1),
    );

  newsView$ = combineLatest([
    this.newsTag$,
    this.currentPageIndex$,
    this.pageSizeAction$,
  ]).pipe(
    concatMap(([tag, page, hitsPerPage,]) =>
      this.http.get<NewsResponse>(this.newsUrl, {
        params: {
          tags: tag,
          page: page.toString(),
          hitsPerPage: hitsPerPage.toString(),
        }
      })
        .pipe(
          takeLast(1),
          catchError(this.handleError)
        )
    ));

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

  setNewsTag(tag: string) {
    this.newsTagSubject.next(tag);
    this.incrementPageIndex(0);
  }

  emitTag(tag: string) {
    this.newsTagSubject.next(tag);
    this.incrementPageIndex(0);
  }

  setTag(tag: string) {
    this.newsTagSubject.next(tag);
  }


  handleError(err: any): Observable<never> {
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

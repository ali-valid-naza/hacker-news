import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject, throwError } from 'rxjs';
import { NewsResponse } from './types';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  pageSizes = [2, 3, 5];
  private newsUrl: string = 'http://hn.algolia.com/api/v1/search?';

  private pageIndexSubject: Subject<number> = new BehaviorSubject<number>(0);
  pageIndex$ = this.pageIndexSubject.asObservable();

  private pageSizeSubject = new BehaviorSubject<number>(this.pageSizes[0]);
  pageSizeAction$ = this.pageSizeSubject.asObservable();

  private newsTagSubject: BehaviorSubject<string> = new BehaviorSubject('front_page');
  newsTag$ = this.newsTagSubject.asObservable();

  news$ = combineLatest([
    this.newsTag$,
    this.pageIndex$,
    this.pageSizeAction$
  ])
    .pipe(
      tap(console.log),
      switchMap(([newsTag, pageNumber, pageSize,]) =>
        this.http.get<NewsResponse>(this.newsUrl, {
            params:
              {
                tags: newsTag,
                page: pageNumber.toString(),
                hitsPerPage: pageSize.toString(),
              }
          }
        )
      ),
      catchError(this.handleError)
    );

  constructor(private http: HttpClient) {
  }

  // Page size was changed
  changePageSize(size: number): void {
    this.pageSizeSubject.next(size);
    // When the page size changes, reset the page number.
    this.incrementPageIndex(0);
  }

  incrementPageIndex(index: number) {
    this.pageIndexSubject.next(index);
  }

  setNewsTag(tag: string) {
    this.newsTagSubject.next(tag);
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

import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, zip } from 'rxjs';
import { Comments, NewsCommentsResponse } from '../news/types';
import { HttpClient } from '@angular/common/http';
import { NewsService } from '../news/news.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentsUrl: string = 'https://hn.algolia.com/api/v1/search?tags=comment';

  private newsObjectIdSubject: BehaviorSubject<string> = new BehaviorSubject('');
  newsObjectId$ = this.newsObjectIdSubject.asObservable();

  private commentsHitsPerPageSubject: BehaviorSubject<string> = new BehaviorSubject('');
  commentsHitsPerPage$ = this.commentsHitsPerPageSubject.asObservable();

  commentData$ =
    zip([
      this.newsObjectId$,
      this.commentsHitsPerPage$
    ]).pipe(
      switchMap(([id, hitsPerPage,]) =>
        this.http.get<NewsCommentsResponse>
        (this.commentsUrl,
          {
            params: {
              tags: `comment,story_${ id }`,
              hitsPerPage: hitsPerPage,
            }
          })
          .pipe(
            map((value) => this.prepareTreeData(value.hits, id)),
            catchError(this.newsService.handleError)
          )
      ),
    );

  prepareTreeData(data: Comments[], newsObjectId: string) {
    return data
      .reduce((parent: Comments[], child: Comments) => {
        child.children = data
          .filter(i => i.parent_id === Number(child.objectID));
        parent.push(child);
        return parent;
      }, [])
      .filter(i => i.parent_id === Number(newsObjectId));
  }


  setNewsObjectId(id: string) {
    console.log(id);
    this.newsObjectIdSubject.next(id);
  }

  setCommentsHitsPerPage(hitsPerPage: string) {
    console.log(hitsPerPage);
    this.commentsHitsPerPageSubject.next(hitsPerPage);
  }

  constructor(
    private http: HttpClient,
    private newsService: NewsService,
  ) {
  }
}

import { Injectable, Injector } from '@angular/core';
import { Comment, NewsCommentsResponse } from "../../types";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TAGS_COMMENT_STORY } from '../../app.constants';
import { map, takeUntil, } from "rxjs/operators";
import { UnsubscribeService } from "../utility/unsubscribe-service/unsubscribe.service";

@Injectable({
  providedIn: 'root'
})
export class GetCommentsListService {
  protected ngUnsubscribe$: UnsubscribeService;
  tagsCommentStory: string = TAGS_COMMENT_STORY;

  constructor(
    private http: HttpClient,
    protected injector: Injector,
  ) {
    this.ngUnsubscribe$ = injector.get(UnsubscribeService);
  }

  getResponse(
    url: string,
    numberHitsPerPage: string,
    newsObjectId: string,
  ): Observable<NewsCommentsResponse> {
    return this.http
      .get<NewsCommentsResponse>(`${url}${numberHitsPerPage}${this.tagsCommentStory}${newsObjectId}`);
  }

  prepareTreeData(array: Comment[], newsObjectId: string,): Comment[] {
    return array
      .reduce((parent: Comment[], child: Comment) => {
        child.children = array
          .filter(i => i.parent_id === Number(child.objectID));
        parent.push(child);
        return parent;
      }, [])
      .filter(i => i.parent_id === Number(newsObjectId));
  }

  getComments(url: string,
              numberHitsPerPage: string,
              newsObjectId: string,): Observable<Comment[]> {
    return this.getResponse(url, numberHitsPerPage, newsObjectId)
      .pipe(
        map(v => this.prepareTreeData(v.hits, newsObjectId),
          takeUntil(this.ngUnsubscribe$),
        )
      );
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommentsService } from '../../comments/comments.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent implements OnInit{
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
    private newsService: NewsService,
    private comments: CommentsService,
    private route: ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(tap((v) => this.newsService.setTag(v['newsTag'])))
      .subscribe();
  }

  setPage(pageIndex: number) {
    this.newsService.incrementPageIndex(pageIndex);
  }

  setPageSize(pageSize: number): void {
    this.selectedButton = pageSize;
    this.newsService.changePageSize(pageSize);
  }

  setCommentsParams(id: string, hitsParPage: number) {
    this.setObjectId(id)
    this.setCommentsHitsPerPage(hitsParPage)
  }

  setObjectId(id: string) {
    this.comments.setNewsObjectId(id)
  }

  setCommentsHitsPerPage(hitsParPage: number) {
    this.comments.setCommentsHitsPerPage(hitsParPage.toString())
  }
}

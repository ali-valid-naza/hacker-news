import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../news/news.service';
import { Comments } from '../../news/types';
import { CommentsService } from '../comments.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-wrapper',
  templateUrl: './comment-wrapper.component.html',
  styleUrls: ['./comment-wrapper.component.css']
})
export class CommentWrapperComponent implements OnInit {
  commentData$ = this.comments.commentData$;
  input: Comments[] | undefined;

  constructor(
    private newsService: NewsService,
    private comments: CommentsService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(v => {
      this.comments.setNewsObjectId(v['newsObjectId']);
      this.comments.setCommentsHitsPerPage(v['hitsPerPage']);
    });
  }
}

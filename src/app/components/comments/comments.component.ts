import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetNewsListService } from "../../services/get-news-list/get-news-list.service";
import { ActivatedRoute } from "@angular/router";
import { URL_HITS_PER_PAGE } from '../../app.constants';
import { GetCommentsListService } from "../../services/get-comments-list/get-comments-list.service";
import { Comment, CommentNode, } from "../../types";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { LoadingService } from "../../services/utility/loading-service/loading.service";
import { TransitDataService } from "../../services/utility/transit-data-service/transit-data.service";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit, OnDestroy {

  private _transformer = (node: Comment, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      comment_text: node.comment_text,
      objectID: node.objectID,
      created_at: node.created_at,
      title: node.title,
      url: node.url,
      author: node.author,
      points: node.points,
      story_text: node.story_text,
      num_comments: node.num_comments,
      story_id: node.story_id,
      story_title: node.story_title,
      story_url: node.story_url,
      parent_id: node.parent_id,
      created_at_i: node.created_at_i,
      _tags: node._tags,
      _highlightResult: node._highlightResult,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<CommentNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  newsTitle: string;
  newsObjectID: string;
  numberCommentsOfNews: string;
  commentsNewsUrl = URL_HITS_PER_PAGE;
  $loading = this.loader.$loading;
  storyText: unknown;

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private getNewsListService: GetNewsListService,
    private getComments: GetCommentsListService,
    private route: ActivatedRoute,
    private loader: LoadingService,
    private transitDataService: TransitDataService,
  ) {
  }

  hasChild = (_: number, node: CommentNode) => node.expandable;

  ngOnInit(): void {
    this.route.url.subscribe(v => {
      this.newsObjectID = v[1].path;
      this.numberCommentsOfNews = v[2].path;
      this.newsTitle = v[3].path;
    });

    this.getComments
      .getComments(this.commentsNewsUrl,
        this.numberCommentsOfNews,
        this.newsObjectID,).subscribe(v => this.dataSource.data = v
    );

    sessionStorage.getItem(this.newsObjectID) ?
      this.storyText = sessionStorage.getItem(this.newsObjectID)
      : this.textNewsTransitData();
  }

  textNewsTransitData() {
    this.transitDataService.subscriber$.subscribe(v => {
      if (v.has(this.newsObjectID) && v.get(this.newsObjectID) !== null) {
        this.storyText = v.get((this.newsObjectID));
        this.setTextNewsToSessionStorage(this.newsObjectID, this.storyText);
      }
    });
  }

  setTextNewsToSessionStorage(id: string, value: any) {
    sessionStorage.setItem(id, value);
  }

  ngOnDestroy() {
    sessionStorage.removeItem(this.newsObjectID);
  }
}

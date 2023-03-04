import { Component, Input } from '@angular/core';
import { DevNewsServiceService } from '../../../dev/dev-news-service.service';
import { Comments } from '../../../news/types';

@Component({
  selector: 'app-comment-wrapper',
  templateUrl: './comment-wrapper.component.html',
  styleUrls: ['./comment-wrapper.component.css']
})
export class CommentWrapperComponent {
  commentData$ = this.newsService.commentData$;
  input: any

  constructor(
    private newsService: DevNewsServiceService,) {
    this.commentData$.subscribe((v) => {
      console.log(v)
      console.log(this.prepareTreeData(v.hits, '34999925'));
      // this.tree = this.prepareTreeData(v.hits, '34999925')
      this.input = this.prepareTreeData(v.hits, '34999925')
    })

    // this.newsService.devCommentData$.subscribe(console.log)

    // console.log(this.prepareTreeData(this.dcm.hits, '34999925'));
  }

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
}

import { Component } from '@angular/core';
import { DevNewsServiceService } from '../../dev/dev-news-service.service';

@Component({
  selector: 'app-comments-tree',
  templateUrl: './comments-tree.component.html',
  styleUrls: ['./comments-tree.component.css']
})
export class CommentsTreeComponent {

  constructor(
    private newsService: DevNewsServiceService,
  ) {

  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comments } from '../../news/types';

@Component({
  selector: 'app-comments-tree',
  templateUrl: './comments-tree.component.html',
  styleUrls: ['./comments-tree.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsTreeComponent {
  @Input() input: Comments[] | undefined;
}

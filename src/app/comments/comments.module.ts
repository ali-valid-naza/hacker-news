import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsTreeComponent } from './comments-tree/comments-tree.component';
import { CommentWrapperComponent } from './comment-wrapper/comment-wrapper.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../loader.interceptor';


@NgModule({
  declarations: [
    CommentWrapperComponent,
    CommentsTreeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CommentWrapperComponent
      },
    ]),
  ],
})
export class CommentsModule { }

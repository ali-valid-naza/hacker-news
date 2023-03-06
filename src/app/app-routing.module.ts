import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news/news-list/news-list.component';
import { CommentsTreeComponent } from './comments/comments-tree/comments-tree.component';
import { MainNavigationComponent } from './news/main-navigation/main-navigation.component';
import { DevListComponent } from './dev/dev-list/dev-list.component';
import { CommentWrapperComponent } from './comments/comment-wrapper/comment-wrapper.component';

const routes: Routes = [
  // {path: '', component: MainNavigationComponent},
  {path: 'news/:newsTag', component: NewsListComponent},
  {path: 'dev/news/:newsTag', component: DevListComponent},
  // {path: 'comment', component: CommentsTreeComponent},
  {path: 'comment/:newsObjectId/:hitsPerPage', component: CommentWrapperComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

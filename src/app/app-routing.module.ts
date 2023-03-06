import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news/news-list/news-list.component';
import { CommentWrapperComponent } from './comments/comment-wrapper/comment-wrapper.component';

const routes: Routes = [
  // {path: '', component: MainNavigationComponent},
  {path: 'news/:newsTag', component: NewsListComponent},
  {
    path: 'comment/:newsObjectId/:hitsPerPage',
    data: { preload: false },
    loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

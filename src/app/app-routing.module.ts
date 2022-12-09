import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { FrontNewsComponent } from './components/front-news/front-news.component';
import { PreviousNewsComponent } from './components/previous-news/previous-news.component';
import { DevNewsComponent } from './components/DEV/dev-news/dev-news.component';
import { BaseListComponent } from './components/DEV/base-list/base-list.component';
import { DevPreviousNewsComponent } from './components/DEV/dev-previous-news/dev-previous-news.component';

const routes: Routes = [
  {path: 'dev-news', component: DevNewsComponent},
  {path: 'base', component: BaseListComponent},
  {path: 'dev-prev', component: DevPreviousNewsComponent},
  {path: '', component: FrontNewsComponent},
  {path: 'previous', component: PreviousNewsComponent},
  {path: 'comments/:newsObjectId/:newsNumComments/:newsTitle', component: CommentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

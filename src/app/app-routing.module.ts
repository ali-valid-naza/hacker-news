import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { DevNewsComponent } from './components/DEV/dev-news/dev-news.component';
import { DevPreviousNewsComponent } from './components/DEV/dev-previous-news/dev-previous-news.component';
import { DevPollNewsComponent } from './components/DEV/dev-poll-news/dev-poll-news.component';
import { PolloptNewsComponent } from './components/DEV/pollopt-news/pollopt-news.component';

const routes: Routes = [
  {path: 'dev-news', component: DevNewsComponent},
  {path: 'dev-poll', component: DevPollNewsComponent},
  {path: 'pollopt', component: PolloptNewsComponent},
  {path: 'dev-prev', component: DevPreviousNewsComponent},
  {path: '', component: DevNewsComponent},
  {path: 'comments/:newsObjectId/:newsNumComments/:newsTitle', component: CommentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

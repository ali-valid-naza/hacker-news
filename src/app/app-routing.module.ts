import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { NewsComponent } from './components/news/news.component';
import { PreviousNewsComponent } from './components/previous-news/previous-news.component';
import { PollNewsComponent } from './components/poll-news/poll-news.component';
import { PolloptNewsComponent } from './components/pollopt-news/pollopt-news.component';

const routes: Routes = [
  {path: 'news/:pageIndex', component: NewsComponent},
  {path: 'poll/:pageIndex', component: PollNewsComponent},
  {path: 'pollopt/:pageIndex', component: PolloptNewsComponent},
  {path: 'prev/:pageIndex', component: PreviousNewsComponent},
  {path: '', component: NewsComponent},
  {path: 'comments/:newsObjectId/:newsNumComments/:newsTitle', component: CommentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

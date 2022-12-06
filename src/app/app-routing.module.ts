import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { FrontNewsComponent } from './components/front-news/front-news.component';
import { PreviousNewsComponent } from './components/previous-news/previous-news.component';

const routes: Routes = [
  {path: '', component: FrontNewsComponent},
  {path: 'previous', component: PreviousNewsComponent},
  {path: 'comments/:newsObjectId/:newsNumComments/:newsTitle', component: CommentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';

const routes: Routes = [
  {path: '', component: NewsListComponent},
  {path: 'comments/:newsObjectId/:newsNumComments/:newsTitle', component: CommentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

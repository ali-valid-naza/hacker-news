import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news/news-list/news-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'news/front_page', pathMatch: 'full'},
  {path: 'news/:newsTag', component: NewsListComponent},
  {
    path: 'comment/:newsObjectId/:hitsPerPage',
    data: { preload: false },
    loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

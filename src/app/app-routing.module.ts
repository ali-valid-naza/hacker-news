import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news/news-list/news-list.component';

const routes: Routes = [
  {path: 'news/:newsTag/:pageIndex', component: NewsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

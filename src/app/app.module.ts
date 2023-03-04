import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news/news-list/news-list.component';
import { CommentsTreeComponent } from './comments/comments-tree/comments-tree.component';
import { MainNavigationComponent } from './news/main-navigation/main-navigation.component';
import { DevListComponent } from './dev/dev-list/dev-list.component';
import { CommentWrapperComponent } from './comments/comments-tree/comment-wrapper/comment-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    CommentsTreeComponent,
    MainNavigationComponent,
    DevListComponent,
    CommentWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

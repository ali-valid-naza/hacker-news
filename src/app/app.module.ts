import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CacheInterceptor } from './interceptors/global-http-caching/cache.interceptor';
import { GlobalHttpErrorHandlerInterceptor } from './interceptors/global-http-error-handler/global-http-error-handler.interceptor';
import { GlobalHttpLoaderInterceptor } from './interceptors/global-http-loader/global-http-loader.interceptor';
import { NewsListComponent } from './components/news-list/news-list.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FrontNewsComponent } from './components/front-news/front-news.component';
import { PreviousNewsComponent } from './components/previous-news/previous-news.component';
import { ListNewsComponent } from './components/list-news/list-news.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    CommentsComponent,
    SearchInputComponent,
    FrontNewsComponent,
    PreviousNewsComponent,
    ListNewsComponent,
    MainNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    NoopAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpLoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

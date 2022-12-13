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
import { CommentsComponent } from './components/comments/comments.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { NewsComponent } from './components/news/news.component';
import { BaseListComponent } from './components/base-list/base-list.component';
import { PreviousNewsComponent } from './components/previous-news/previous-news.component';
import { PollNewsComponent } from './components/poll-news/poll-news.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { PolloptNewsComponent } from './components/pollopt-news/pollopt-news.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    SearchInputComponent,
    NewsComponent,
    BaseListComponent,
    PreviousNewsComponent,
    PollNewsComponent,
    MainNavigationComponent,
    PolloptNewsComponent
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

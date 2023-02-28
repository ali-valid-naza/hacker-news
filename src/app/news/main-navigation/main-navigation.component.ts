import { Component } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent {
  pageTitle = "Menu";
  constructor(private newsService: NewsService) {
  }

  reinitializePageIndexSubject() {
    this.newsService.reinitializePageIndexSubject()
  }
}

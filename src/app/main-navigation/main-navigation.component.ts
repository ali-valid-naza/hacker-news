import { Component } from '@angular/core';
import { NewsService } from '../news/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent {
  pageTitle = "Menu";

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService) {
  }

  emitTag(tag: any) {
    this.newsService.emitTag(tag.target.id);
  }
}

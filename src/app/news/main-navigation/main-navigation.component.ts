import { Component } from '@angular/core';
import { NewsService } from '../news.service';
import { DevNewsServiceService } from '../../dev/dev-news-service.service';
import { ActivatedRoute } from '@angular/router';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent {
  pageTitle = "Menu";
  constructor(
    private route: ActivatedRoute,
    private newsService: DevNewsServiceService) {
  }

  reinitializePageIndexSubject($event: any) {

  }
}

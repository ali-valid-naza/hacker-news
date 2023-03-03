import { Component, EventEmitter, OnInit } from '@angular/core';
import { DevNewsServiceService } from '../../dev/dev-news-service.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {
  pageTitle = "Menu";
  tagNews = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    private newsService: DevNewsServiceService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(tap((v) => this.newsService.setTag(v['newsTag'])))
      .subscribe();
  }


  emitTag(tag: any) {
    this.newsService.emitTag(tag.target.id);
  }
}

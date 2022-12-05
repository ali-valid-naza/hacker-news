import { Component } from '@angular/core';
import { LoadingService } from './services/utility/loading-service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sevstar-hacker-news-test';
  $loading = this.loader.$loading;
  constructor(private loader: LoadingService,) {
  }
}

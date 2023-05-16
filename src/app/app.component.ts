import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loader$ = this.loading.loading$;

  constructor(
    private loading: LoadingService,
  ) {
  }

}

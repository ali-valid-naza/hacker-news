import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BaseListComponent } from '../base-list/base-list.component';

@Component({
  selector: 'app-poll-news',
  templateUrl: '../base-list/base-list.component.html',
  styleUrls: ['../base-list/base-list.component.scss']
})
export class PollNewsComponent extends BaseListComponent
  implements AfterViewInit, OnDestroy {
  override url: string = 'http://hn.algolia.com/api/v1/search'
  override tag: string = 'tags=poll'

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BaseListComponent } from '../base-list/base-list.component';

@Component({
  selector: 'app-previous-news',
  templateUrl: '../base-list/base-list.component.html',
  styleUrls: ['../base-list/base-list.component.scss']
})
export class PreviousNewsComponent extends BaseListComponent
  implements AfterViewInit, OnDestroy {
  override url: string = 'http://hn.algolia.com/api/v1/search_by_date'
  override tag: string = 'tags=story'

  override ngAfterViewInit(): void {
  super.ngAfterViewInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}

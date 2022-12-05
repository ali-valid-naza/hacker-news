import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsubscribeService {
  readonly ngUnsubscribe$ = new Subject<void>();

  constructor() {
    super((subscriber) => this.ngUnsubscribe$.subscribe(subscriber));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}

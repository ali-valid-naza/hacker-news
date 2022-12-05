import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransitDataService {
  private _observer = new BehaviorSubject<Map<string, string>>(new Map<string, string>);
  public subscriber$ = this._observer.asObservable();
  data: Map<string, string>;

  emitData(data: any) {
    this._observer.next(data);
  }
}

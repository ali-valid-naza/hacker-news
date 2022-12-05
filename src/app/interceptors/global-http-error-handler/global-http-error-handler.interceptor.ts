import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from "rxjs/operators";
import { timer } from "rxjs";

@Injectable()
export class GlobalHttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(retry({
        count: 3,
        delay: (_, retryCount) => timer(retryCount * 1000)
      }));
  }
}

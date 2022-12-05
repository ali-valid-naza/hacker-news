import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CacheResolvingService } from "../../services/utility/cache-resolve-service/cache-resolving.service";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { TIME_TO_LIVE } from "../../app.constants";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  timeToLive = TIME_TO_LIVE;

  constructor(private cacheResolver: CacheResolvingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') return next.handle(request);

    const cachedResponse = this.cacheResolver.get(request.url);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next);
  }

  sendRequest(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(tap((e) => {
        if (e instanceof HttpResponse) {
          this.cacheResolver.set(request.url, e, this.timeToLive);
        }
      }));
  }
}



import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/utility/loading-service/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class GlobalHttpLoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoadingService,) {}
  /*todo
  * maybe need works with methods hide and show in service with fetching data
  * */

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();
    return next.handle(request)
      .pipe(
        finalize(() => this.loader.hide())
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CacheResolvingService {
  private cache = new Map<string, [Date | null, HttpResponse<any>]>();

  set(key: string, value: any, timeToLive: number | null = null) {
    if (timeToLive) {
      const expireIn = new Date();
      expireIn.setSeconds(expireIn.getSeconds() + timeToLive);
      this.cache.set(key, [expireIn, value,]);
    } else {
      this.cache.set(key, [null, value,]);
    }
  }

  get(key: string): null | HttpResponse<any> {
    const data = this.cache.get(key);

    if (!data) return null;

    const expiresIn = data[0];
    const httpSaveResponse = data[1];
    const now = new Date();

    if (expiresIn && expiresIn.getTime() < now.getTime()) {
      this.cache.delete(key);
      return null;
    }
    return httpSaveResponse;
  }
}

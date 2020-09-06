import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private shortUrl = new BehaviorSubject(null);
  shortUrl$: Observable<string> = this.shortUrl.asObservable();

  constructor(private http: HttpClient) { }

  getShortUrl(longUrl: string): void{
    const body = { url: longUrl };
    this.http.post<any>('http://localhost:8080/api/v1/create-short-url', body)
    .subscribe(res => {
      console.log(res);
      this.shortUrl.next((res as any).url);
    });
  }
}

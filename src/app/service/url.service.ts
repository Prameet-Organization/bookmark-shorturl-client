import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AppError } from '../model/error';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private shortUrl = new BehaviorSubject<string>(null);
  shortUrl$: Observable<string> = this.shortUrl.asObservable();

  private appError = new BehaviorSubject<AppError>(null);
  error$: Observable<AppError> = this.appError.asObservable();

  constructor(private http: HttpClient) { }

  getShortUrl(longUrl: string): void{
    this.shortUrl.next(null);
    this.appError.next(null);
    const body = { url: longUrl };
    this.http.post<any>('http://localhost:8080/api/v1/create-short-url', body)
    .subscribe(res => {
      this.shortUrl.next((res as any).url);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
      this.appError.next ({ errorMessage: error.error.error });
    });
  }
}

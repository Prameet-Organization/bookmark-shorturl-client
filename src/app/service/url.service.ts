import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AppError } from '../model/error';
import { UrlDetails } from '../model/url-details';
import { API_BASE_URL } from '../constant/index';
@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private baseUrls = `${API_BASE_URL}/api/v1/`;
  private shortUrl = new BehaviorSubject<string>(null);
  shortUrl$: Observable<string> = this.shortUrl.asObservable();

  private appError = new BehaviorSubject<AppError>(null);
  error$: Observable<AppError> = this.appError.asObservable();

  private urls = new BehaviorSubject<Array<any>>([]);
  urls$: Observable<Array<any>> = this.urls.asObservable();

  private updated = new BehaviorSubject<boolean>(false);
  updated$: Observable<boolean> = this.updated.asObservable();

  constructor(private http: HttpClient) { }

  getShortUrl(urlDetails: UrlDetails): void{
    this.shortUrl.next(null);
    this.appError.next(null);
    const formData = new FormData();
    formData.append('url', urlDetails.url);
    formData.append('expirationDateTime', urlDetails.expirationDateTime);
    formData.append('shortTitle', urlDetails.shortTitle);
    formData.append('description', urlDetails.description);
    formData.append('favicon', urlDetails.favicon);
    this.http.post<any>(`${this.baseUrls}short-urls`, formData)
    .subscribe(res => {
      this.shortUrl.next((res as any).url);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }

  getUrls(): void{
    this.http.get<any>(`${this.baseUrls}short-urls`)
    .subscribe(res => {
      this.urls.next(res);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }

  update(urlDetails: UrlDetails): void{
    this.shortUrl.next(null);
    this.appError.next(null);
    const formData = new FormData();
    formData.append('url', null);
    formData.append('expirationDateTime', urlDetails.expirationDateTime);
    formData.append('shortTitle', urlDetails.shortTitle);
    formData.append('description', urlDetails.description);
    formData.append('favicon', urlDetails.favicon);
    this.http.put<any>(`${this.baseUrls}short-urls/${this.getPathName(urlDetails.shortUrl)}`, formData)
    .subscribe(res => {
      this.getUrls();
      this.updated.next(true);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }

  delete(urlString: string): void{
    this.http.delete(`${this.baseUrls}short-urls/${this.getPathName(urlString)}`).subscribe( res => {
      this.getUrls();
    });
  }

  private getPathName(urlString: string): string{
    return urlString.substring(urlString.lastIndexOf('/') + 1);
  }

  public setShortUrl(): void{
    this.shortUrl.next(null);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Group } from '../model/group';
import { API_BASE_URL } from '../constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppError } from '../model/error';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrls = `${API_BASE_URL}/api/v1/`;

  private appError = new BehaviorSubject<AppError>(null);
  error$: Observable<AppError> = this.appError.asObservable();

  constructor(private http: HttpClient) { }

  create(group: Group): void{
    this.http.post<any>(`${this.baseUrls}groups`, group)
    .subscribe(res => {
      console.log(res);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }
}

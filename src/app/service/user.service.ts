import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { AppError } from '../model/error';
import { API_BASE_URL } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrls = `${API_BASE_URL}/api/v1/`;

  private users = new BehaviorSubject<Array<User>>(null);
  users$: Observable<Array<User>> = this.users.asObservable();

  private appError = new BehaviorSubject<AppError>(null);
  error$: Observable<AppError> = this.appError.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(name: string): void{
    this.http.get<any>(`${this.baseUrls}users?name=${name}`)
    .subscribe(res => {
      console.log(res);
      this.users.next(res);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }
}

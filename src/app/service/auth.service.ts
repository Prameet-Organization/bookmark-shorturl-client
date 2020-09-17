import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppError } from '../model/error';
import { API_BASE_URL } from '../constant/index';
import { JwtTokenService } from './jwt-token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrls = API_BASE_URL;

  private user = new BehaviorSubject<string>(null);
  user$: Observable<string> = this.user.asObservable();

  private appError = new BehaviorSubject<AppError>(null);
  error$: Observable<AppError> = this.appError.asObservable();

  constructor(private http: HttpClient, private jwtTokenService: JwtTokenService) { }

  getUser(): void{
    this.http.get<string>(`${this.baseUrls}/auth/user`).subscribe(res => {
      this.user.next(res);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }

  isAuthorized(): boolean{
    return !this.jwtTokenService.isTokenExpired();
  }

  logout(): void{
    this.jwtTokenService.remove();
    this.user.next(null);
  }

}

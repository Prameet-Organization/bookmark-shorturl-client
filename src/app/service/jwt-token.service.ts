import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  TOKEN_NAME = 'BOOKMARK_TOKEN';
  jwtToken: string;
  user: string;
  decodedToken: { [key: string]: string };

  constructor(private localStorageService: LocalStorageService) {
  }

  setToken(token: string): void {
    if (token) {
      this.jwtToken = token;
      this.localStorageService.set(this.TOKEN_NAME, token);
    }
  }

  getToken(): string{
    if  (!!this.jwtToken){
      return this.jwtToken;
    }
    return this.localStorageService.get(this.TOKEN_NAME);
  }

  decodeToken(): void {
    if (this.getToken()) {
    this.decodedToken = jwt_decode(this.getToken());
    }
  }

  getDecodeToken(): any{
    return jwt_decode(this.getToken());
  }

  getExpiryTime(): string {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = +this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }

  remove(): void{
    this.localStorageService.remove(this.TOKEN_NAME);
  }
}

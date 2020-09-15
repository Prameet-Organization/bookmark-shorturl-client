import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private jwtTokenService: JwtTokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.jwtTokenService.getToken()}`
      }
    });
    return next.handle(request);
  }
}

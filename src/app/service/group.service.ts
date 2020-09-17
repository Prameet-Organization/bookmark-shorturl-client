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

  private tribes = new BehaviorSubject<Array<Group>>(null);
  tribe$: Observable<Array<Group>> = this.tribes.asObservable();

  private groups = new BehaviorSubject<Array<Group>>(null);
  groups$: Observable<Array<Group>> = this.groups.asObservable();

  private appError = new BehaviorSubject<AppError>(null);
  error$: Observable<AppError> = this.appError.asObservable();

  private createdFlag = new BehaviorSubject<boolean>(null);
  createdFlag$: Observable<boolean> = this.createdFlag.asObservable();

  private addedUser = new BehaviorSubject<boolean>(null);
  addedUser$: Observable<boolean> = this.addedUser.asObservable();

  private urlAdded = new BehaviorSubject<boolean>(null);
  urlAdded$: Observable<boolean> = this.urlAdded.asObservable();

  constructor(private http: HttpClient) { }

  create(group: Group): void{
    this.appError.next(null);
    this.createdFlag.next(false);
    this.http.post<any>(`${this.baseUrls}groups`, group)
    .subscribe(res => {
      this.createdFlag.next(true);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }

  getTribes(): void{
    this.http.get<any>(`${this.baseUrls}groups?type=tribe`)
    .subscribe(res => {
      this.tribes.next(res);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }

  getGroups(): void{
    this.http.get<any>(`${this.baseUrls}groups`)
    .subscribe(res => {
      this.groups.next(res);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }

  searchGroups(name: string): void{
    this.http.get<any>(`${this.baseUrls}groups?name=${name}`)
    .subscribe(res => {
      console.log(res);
      this.groups.next(res);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }

  addUserToGroup(groupName: any, userName: any): void{
    this.addedUser.next(false);
    this.http.post(`${this.baseUrls}groups/${groupName}`, { username : userName}).subscribe(res => {
      this.addedUser.next(true);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }

  addUrlToGroup(groupName: string, shortUrl: string): void{
    this.http.post(`${this.baseUrls}groups/${groupName}`, { shortUrl }).subscribe(res => {
      this.urlAdded.next(true);
    },
    (error: HttpErrorResponse) => {
      this.appError.next ({ errorMessage: error.error.error });
    });
  }

  resetCreatedFlag(): void{
    this.createdFlag.next(false);
  }
}

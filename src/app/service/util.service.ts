import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  isEmpty(value: string): boolean {
    if (value === null || value === undefined || value ===  ''){
      return true;
    }
    return false;
  }
}

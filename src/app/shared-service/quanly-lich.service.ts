import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuanlyLichService {
  private url = "http://localhost:8080/api/quan-ly/";

  constructor() { }


}

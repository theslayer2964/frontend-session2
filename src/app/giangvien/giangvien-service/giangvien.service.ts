import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GiangvienService {
  private url = "http://localhost:8080/api/giang-vien/lay-nam-hoc-ky";

  constructor() { }
}

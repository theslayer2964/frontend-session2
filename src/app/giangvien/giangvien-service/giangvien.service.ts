import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GiangvienService {
  private url = "http://localhost:8080/api/hoc-ky/lay-nam-hoc-ky";

  constructor() { }
}

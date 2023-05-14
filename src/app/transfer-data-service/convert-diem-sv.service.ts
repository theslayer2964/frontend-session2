import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertDiemSVService {

  constructor() { }

  convertToXepLoai(diemChu: string): string{
    if(diemChu == 'A+')
      return "Xuất sắc";
    else if(diemChu == 'A')
      return 'Giỏi';
    else if(diemChu == 'B+' || diemChu == 'B')
      return 'Khá';
    else if(diemChu == 'C+' || diemChu == 'C')
      return 'Trung Bình';
    else if(diemChu == 'D' || diemChu == 'D+')
      return 'Trung Bình Yếu';
    else
      return 'Kém';
  }
  convertToDat(diemGPA: number): boolean{
    if(diemGPA>= 2.0)
      return true;
    else
      return false;
  }
}

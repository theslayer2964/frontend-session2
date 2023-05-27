import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quanly-tientrinh-chung',
  templateUrl: './quanly-tientrinh-chung.component.html',
  styleUrls: ['./quanly-tientrinh-chung.component.scss']
})
export class QuanlyTientrinhChungComponent implements OnInit {
  public soLuongSinhVien: number = 93;
  public soLuongDeTai: number = 46;
  public soLuongGiangVien: number = 10;
  constructor() { }

  ngOnInit() {

  }

  ceilNumber(number: number){
    return Math.ceil(number);
  }
}

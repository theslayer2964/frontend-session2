import { Component, OnInit } from '@angular/core';
import {QlTientrinhDetaiTransferService} from "../../transfer-data-service/ql-tientrinh-detai-transfer.service";
import {QlTientrinhSvTransferService} from "../../transfer-data-service/ql-tientrinh-sv-transfer.service";
import {QlTientrinhGvTransferService} from "../../transfer-data-service/ql-tientrinh-gv-transfer.service";
import {MatDialog} from "@angular/material/dialog";
import {DsGVChuaDuDeTaiComponent} from "../../dialog/ds-gvchua-du-de-tai/ds-gvchua-du-de-tai.component";

@Component({
  selector: 'app-quanly-tientrinh-chung',
  templateUrl: './quanly-tientrinh-chung.component.html',
  styleUrls: ['./quanly-tientrinh-chung.component.scss']
})
export class QuanlyTientrinhChungComponent implements OnInit {
  public soLuongSinhVien: number;
  public soLuongDeTai: number;
  public soLuongGiangVien: number;
  constructor(
      public dialog: MatDialog,
      private qlTientrinhDetaiTransferService: QlTientrinhDetaiTransferService,
      private qlTientrinhSVTransferService: QlTientrinhSvTransferService,
      private qlTientrinhGVTransferService: QlTientrinhGvTransferService
  ) { }

  ngOnInit() {
    this.qlTientrinhSVTransferService.tientrinhBehaviorSubject.subscribe(sv => {
     this.soLuongSinhVien = sv;
    });
    this.qlTientrinhDetaiTransferService.tientrinhDeTaiBehaviorSubject.subscribe( detai  => {
      this.soLuongDeTai = detai;
    });
    this.qlTientrinhGVTransferService.tientrinhGvBehaviorSubject.subscribe( gv => {
      this.soLuongGiangVien = gv;
      console.log("GV:", this.soLuongGiangVien);
    })
  }

  ceilNumber(number: number){
    return Math.ceil(number);
  }

  showDSGVChuaDuDeTai() {
    this.dialog.open(DsGVChuaDuDeTaiComponent, {
      data: this.ceilNumber((this.soLuongSinhVien/2 + 5)/this.soLuongGiangVien),
      width: '650px'
    });
  }
}

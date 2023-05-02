import { Component, OnInit } from '@angular/core';
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {HockyService} from "../../shared-service/hocky.service";
import {MatDialog} from "@angular/material/dialog";
import {XepNhomLichTransferService} from "../../transfer-data-service/xep-nhom-lich-transfer.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-ql-tkb-chianhom',
  templateUrl: './ql-tkb-chianhom.component.html',
  styleUrls: ['./ql-tkb-chianhom.component.scss']
})
export class QlTkbChianhomComponent implements OnInit {
  private hocKyHienTai: any;
  private soHocKy: any;
  constructor(public dialog: MatDialog, private hockyService: HockyService,
              public xepLichNhomTransferService: XepNhomLichTransferService) { }

  ngOnInit(): void {
    this.getAllHocKy();
  }

  dsHocKy: HocKy[];

  // 1. STEP 1
  private getAllHocKy() {
    this.hockyService.getHocKy().subscribe({
      next: (res) => {
        this.dsHocKy = res;
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3);
    this.soHocKy = $event.value.toString().slice(2);
    this.xepLichNhomTransferService.sendHocKy($event.value)
  }

  applyFilter($event: KeyboardEvent) {

  }
  showBangData: any;

  changeLoaiLich($event: MatSelectChange) {
    this.showBangData = $event.value
    if (this.showBangData == 0) {
      this.getDSLichTheoHK(this.hocKyHienTai, "PB");
    } else if (this.showBangData == 1) {
      this.getDSLichTheoHK(this.hocKyHienTai, "HD");
    }
  }

  private getDSLichTheoHK(maHocKy: any, loaiLich: any) {

  }
  // Table PHAN BIEN
  displayedColumnsPB: string[] = ["maLich", "tenLich", "ngay", "tiet", "gvpb1", "gvpb2","maNhom","tenNhom","maDeTai","tenDeTai", "phong", "action"];
  dataSourcePB!: MatTableDataSource<any>;


  deleteLichPB(maDeTai: any) {

  }

  editLichPB(row) {

  }
  // Table HOI DONG
  displayedColumnsHD: string[] = ["maLich", "tenLich", "ngay", "tiet","chutichhd","tv3","thukyHD","maNhom","tenNhom","maDeTai","tenDeTai", "phong", "action"];
  dataSourceHD!: MatTableDataSource<any>;
}

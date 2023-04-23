import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

interface GiangVien {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-quanly-phieucham',
  templateUrl: './quanly-phieucham.component.html',
  styleUrls: ['./quanly-phieucham.component.scss']
})
export class QuanlyPhieuchamComponent implements OnInit {

  constructor(public dialog: MatDialog, private hockyService: HockyService,
              private userAuthService: UserAuthService, private router: Router) { }
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
  private hocKyHienTai: any;
  private soHocKy: any;
  dsVaiTro: GiangVien[] = [
    {value: "HD", viewValue:"Giảng viên hướng dẫn" },
    {value: "PB", viewValue:"Giảng viên phản biện" },
    {value: "CT", viewValue:"Chủ tịch hội đồng" },
    {value: "TK", viewValue:"Thư ký hướng dẫn" },
  ];

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3)
    this.soHocKy = $event.value.toString().slice(2)
    console.log('XXX:', this.hocKyHienTai, this.soHocKy);
    // this.getDSDeTaiTheoHK(this.hocKyHienTai, this.soHocKy);
  }

  nhapDiemExcel() {

  }

  xuatFileChamDiemMacDinh() {

  }

  xuatFileExcel() {

  }

  applyFilter($event: KeyboardEvent) {
    
  }

  directTieuChiCham() {
    this.router.navigate(["/quanly","tieuchicham"])
  }

    changeGiangVien($event: MatSelectChange) {
      console.log("Giá tri dc chon:", $event.value);
    }
  // Table
  displayedColumns: string[] = ["maChuanDauRa","tenChuanDauRa","diemToiDa" ,"action"];
  dataSource!: MatTableDataSource<any>;

  editProduct(row) {
    
  }

  deleteProduct(maDeTai: any) {
    
  }
}

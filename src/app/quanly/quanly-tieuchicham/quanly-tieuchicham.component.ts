import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {Router} from "@angular/router";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-quanly-tieuchicham',
  templateUrl: './quanly-tieuchicham.component.html',
  styleUrls: ['./quanly-tieuchicham.component.scss']
})
export class QuanlyTieuchichamComponent implements OnInit {

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

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3)
    this.soHocKy = $event.value.toString().slice(2)
    console.log('XXX:', this.hocKyHienTai, this.soHocKy);
    // this.getDSDeTaiTheoHK(this.hocKyHienTai, this.soHocKy);
  }

    xuatFileChamDiemMacDinh() {

    }

  xuatFileExcel() {

  }

  nhapExcel() {

  }

  addTieuChiCham() {

  }

  applyFilter($event: KeyboardEvent) {
    
  }
  // Table
  displayedColumns: string[] = ["maChuanDauRa","tenChuanDauRa","diemToiDa" ,"action"];
  dataSource!: MatTableDataSource<any>;

  editProduct(row) {
    
  }

  deleteProduct(maDeTai: any) {
    
  }

  directPhieuCham() {
    this.router.navigate(["/quanly","phieucham"]);
  }
}

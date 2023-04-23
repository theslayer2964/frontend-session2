import { Component, OnInit } from '@angular/core';
import {HocKy} from "../../shared-service/HocKy.models";
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../detai/detai-service/detai.service";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-giangvien-chamdiem',
  templateUrl: './giangvien-chamdiem.component.html',
  styleUrls: ['./giangvien-chamdiem.component.scss']
})
export class GiangvienChamdiemComponent implements OnInit {

  constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService,
              private userAuthService: UserAuthService) { }
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

  openDialogExcel() {

  }

  applyFilter($event: KeyboardEvent) {
    
  }

  changeHocKy($event: MatSelectChange) {
    
  }

  // Table
  displayedColumns: string[] = ['maSV','tenSV','maDeTai', "tenDeTai", 'maNhom', 'tenNhom', "diem" ,"action"];
  dataSource!: MatTableDataSource<any>;

  editProduct(row) {
    
  }

  nhapDiemExcel() {
    console.log("Nhập điểm bằng Excel");
  }

  xuatFileChamDiemMacDinh() {
    console.log("FILE CHAM MAC DINH")
  }

  xuatFileExcel() {
    console.log("XUAT FILE EXCEL KQ")
  }
}

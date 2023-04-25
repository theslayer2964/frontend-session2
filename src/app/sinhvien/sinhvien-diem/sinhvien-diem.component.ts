import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-sinhvien-diem',
  templateUrl: './sinhvien-diem.component.html',
  styleUrls: ['./sinhvien-diem.component.scss']
})
export class SinhvienDiemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Table
  displayedColumns: string[] = ["maLopHocPhan", 'tenMonHoc', 'soTinChi', "diemTongKet", "diemThangDiem4",
    "diemChu", "xepLoai" ,"ghiChu","dat"];
  dataSource!: MatTableDataSource<any>;

}
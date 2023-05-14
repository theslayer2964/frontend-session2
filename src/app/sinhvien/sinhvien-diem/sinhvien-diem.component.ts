import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SinhvienService} from "../../shared-service/sinhvien.service";

@Component({
  selector: 'app-sinhvien-diem',
  templateUrl: './sinhvien-diem.component.html',
  styleUrls: ['./sinhvien-diem.component.scss']
})
export class SinhvienDiemComponent implements OnInit {

  constructor(private sinhvienService: SinhvienService) { }
  ngOnInit(): void {
    this.sinhvienService.getDiemSV(null).subscribe((res:[]) => {
      this.dataSource = new MatTableDataSource(res);
    })
  }

  // Table
  displayedColumns: string[] = ["maLopHocPhan", 'tenMonHoc', 'soTinChi', "diemTongKet", "diemThangDiem4",
    "diemChu", "xepLoai" ,"ghiChu","dat"];
  dataSource!: MatTableDataSource<any>;

}

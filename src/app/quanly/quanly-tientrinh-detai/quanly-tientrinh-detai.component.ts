import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {DanhSach_DeTai_KLTN} from "../../shared-service/FileNameExport";

@Component({
  selector: 'app-quanly-tientrinh-detai',
  templateUrl: './quanly-tientrinh-detai.component.html',
  styleUrls: ['./quanly-tientrinh-detai.component.scss']
})
export class QuanlyTientrinhDetaiComponent implements OnInit {

  constructor(private qlLichService: QuanlyLichService) { }

  ngOnInit(): void {
    this.qlLichService.dsSvChuaDkNhom().subscribe((res:[]) => {
      if(res){
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dsNhom = res;
      }
    });
  }
  // table:
  displayedColumns: string[] = ['maSinhVien','tenSinhVien','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dsNhom: [];
  clickedRows = new Set<any>();
  clickNeMa(row) {
    this.clickedRows.add(row);
  }

  ganNhomNgauNhien() {
    console.log("DS SV:",this.clickedRows);
    new NotificationsComponent().showNotification('success', 'Xử lý típ đi');
  }
}

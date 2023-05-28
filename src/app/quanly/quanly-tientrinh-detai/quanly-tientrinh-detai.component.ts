import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-quanly-tientrinh-detai',
  templateUrl: './quanly-tientrinh-detai.component.html',
  styleUrls: ['./quanly-tientrinh-detai.component.scss']
})
export class QuanlyTientrinhDetaiComponent implements OnInit {

  constructor(private qlLichService: QuanlyLichService) { }

  ngOnInit(): void {
    this.getDSNhomChuaGanDeTai();
  }
  getDSNhomChuaGanDeTai(){
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
    let temp = [];
    this.clickedRows.forEach(sv => {
      temp.push(sv.maSinhVien)
    })
    console.log("DS SV:",temp);
    this.qlLichService.ganNhomNgauNhienBoiNgQuLy(temp).subscribe(res => {
      this.getDSNhomChuaGanDeTai();
      this.clickedRows = new Set<any>();
      new NotificationsComponent().showNotification('success', 'Gán nhóm thành công');
    })
  }

  ganNhomNgauNhienChoTonBO() {

  }
}

import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TinnhanService} from "../../shared-service/tinnnhan.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-dsnhom-chua-dk-de-tai',
  templateUrl: './dsnhom-chua-dk-de-tai.component.html',
  styleUrls: ['./dsnhom-chua-dk-de-tai.component.scss']
})
export class DSNhomChuaDkDeTaiComponent implements OnInit {

  constructor(private qlLichService: QuanlyLichService,
              public dialogRef: MatDialogRef<DSNhomChuaDkDeTaiComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private tinNhanService: TinnhanService) { }

  ngOnInit(): void {
    this.qlLichService.dsNhomChuaCoDeTai().subscribe((res:[]) => {
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

  sendMessage1Nguoi(row) {
    let noiDung = " | | " + "Các nhóm cần nhanh chóng đăng ký đề tài trong thời gian đã hẹn. " ;
    this.tinNhanService.themTinNhan({
      maNguoiNhan: row.maGiangVien,
      maNguoiGui: "12392401",
      noiDung: noiDung
    }).subscribe(res => {
      this.dialogRef.close();
      new NotificationsComponent().showNotification('success', 'Gửi tin thành công thành công');
    })
    console.log(noiDung)
  }

  sendMessageAll() {
    this.dsNhom.forEach((gv : any) => {
      console.log(gv)
      let noiDung = " | | " + "Các nhóm cần nhanh chóng đăng ký đề tài trong thời gian đã hẹn. " ;
      this.tinNhanService.themTinNhan({
        maNguoiNhan: gv.maSinhVien,
        maNguoiGui: "12392401",
        noiDung: noiDung
      }).subscribe(res => {
        this.dialogRef.close();
        new NotificationsComponent().showNotification('success', 'Gửi tin thành công thành công');
      })
      console.log(gv)
    })
  }
}

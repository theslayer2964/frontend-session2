import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TinnhanService} from "../../shared-service/tinnnhan.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-ds-gvchua-du-de-tai',
  templateUrl: './ds-gvchua-du-de-tai.component.html',
  styleUrls: ['./ds-gvchua-du-de-tai.component.scss']
})
export class DsGVChuaDuDeTaiComponent implements OnInit {
  constructor(private qlLichService: QuanlyLichService,
              public dialogRef: MatDialogRef<DsGVChuaDuDeTaiComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private tinNhanService: TinnhanService) { }

  ngOnInit(): void {
    if(this.data){
    this.qlLichService.dsGvChuaDangKyDuSoLuongDeTai(this.data).subscribe((res:[]) => {
      if(res){
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dsGV = res;
      }
    });
    }
  }
  // table:
  displayedColumns: string[] = ['maGiangVien','tenGiangVien','soLuongDeTaiDaCo','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  sendMessage1Nguoi(row) {
    let soDeTaiConThiu = this.data - row.soLuongDeTaiDaCo;
    let noiDung = " | | " + "Thầy/cô cần thêm " + soDeTaiConThiu + " đề tài nữa để có thể đủ số sinh viên đăng ký";
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

  dsGV:[];
  sendMessageAll() {
    this.dsGV.forEach((gv : any) => {
      let soDeTaiConThiu = this.data - gv.soLuongDeTaiDaCo;
      let noiDung = " | | " + "Thầy/cô cần thêm " + soDeTaiConThiu + " đề tài nữa để có thể đủ số sinh viên đăng ký | " +
          "số lượng đề tài tối tối thiểu " + this.data  + " | " + "số lượng đề tài hiện có " + gv.soLuongDeTaiDaCo;
      this.tinNhanService.themTinNhan({
        maNguoiNhan: gv.maGiangVien,
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

import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TinnhanService} from "../../shared-service/tinnnhan.service";

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
    
  }

  dsGV:[];
  sendMessageAll() {
    // this.dsGV.forEach(gv => {
    // this.tinNhanService.layTinNhan()
    // })
  }
}

import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TinnhanService} from "../../shared-service/tinnnhan.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

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
    
  }

  sendMessageAll() {

  }
}

import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TinnhanService} from "../../shared-service/tinnnhan.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-dssvchua-dk-nhom',
  templateUrl: './dssvchua-dk-nhom.component.html',
  styleUrls: ['./dssvchua-dk-nhom.component.scss']
})
export class DSSVChuaDkNhomComponent implements OnInit {

  constructor(private qlLichService: QuanlyLichService,
              public dialogRef: MatDialogRef<DSSVChuaDkNhomComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private tinNhanService: TinnhanService) { }

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

  sendMessage1Nguoi(row) {

  }

  sendMessageAll() {

  }

}

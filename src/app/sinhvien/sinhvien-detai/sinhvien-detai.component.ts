import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HockyService} from "../../shared-service/hocky.service";
import {DetaiSvService} from "../sinhvien-service/detai-sv.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-sinhvien-detai',
  templateUrl: './sinhvien-detai.component.html',
  styleUrls: ['./sinhvien-detai.component.scss']
})
export class SinhvienDetaiComponent implements OnInit {
  ngOnInit(): void {
  }
  private hocKyHienTai: any;
  constructor(public dialog: MatDialog, private detaiService: DetaiSvService, private hockyService: HockyService) {
  }
  private getDSDeTaiTheoHK(hocKy: any) {
    this.detaiService.getDeTaiRoleGV(hocKy)
        .subscribe({
          next: (res) => {
            console.log("DS DE TAI:", res);
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: () => {
            console.log("Error")
          }
        })
  }

  displayedColumns: string[] = ['nhom','sv1','sv2','tinhTrang','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    console.log("OPEN LOG")
  }

  editProduct(row) {
    
  }

  deleteProduct(id) {
    
  }
}

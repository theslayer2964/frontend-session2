import { Component, OnInit } from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-ql-giangvien',
  templateUrl: './ql-giangvien.component.html',
  styleUrls: ['./ql-giangvien.component.scss']
})
export class QlGiangvienComponent implements OnInit {
  private hocKyHienTai: any;
  private soHocKy: any;

  constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService,
              private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    this.getAllHocKy();
  }

  dsHocKy: HocKy[];

  // 1. STEP 1
  private getAllHocKy() {
    this.hockyService.getHocKy().subscribe({
      next: (res) => {
        this.dsHocKy = res;
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3);
    this.soHocKy = $event.value.toString().slice(2);
    console.log('XXX:', this.hocKyHienTai, this.soHocKy);
  }

  applyFilter($event: KeyboardEvent) {
    
  }

  // Table
  displayedColumns: string[] = ["maNhom","tenNhom","maDeTai","tenDeTai","maSV1","tenSV1","maSV2","tenSV2","GVHD","GVPB1","GVPB2","action"];
  dataSource!: MatTableDataSource<any>;
}

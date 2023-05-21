import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SinhvienService} from "../../shared-service/sinhvien.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {ConvertDiemSVService} from "../../transfer-data-service/convert-diem-sv.service";

@Component({
  selector: 'app-sinhvien-diem',
  templateUrl: './sinhvien-diem.component.html',
  styleUrls: ['./sinhvien-diem.component.scss']
})
export class SinhvienDiemComponent implements OnInit {

  constructor(private sinhvienService: SinhvienService, private userAuthService: UserAuthService, private convertDiem: ConvertDiemSVService) { }
  ngOnInit(): void {
    this.sinhvienService.getDiemSV(this.userAuthService.getUserInfo().maSinhVien).subscribe((res:any) => {
      if(res!=null){
        if(res.diemTongKet!=null){
        res.xepLoai = this.convertDiem.convertToXepLoai(res.diemChu);
        res.dat = this.convertDiem.convertToDat(res.thangDiem4);
        this.dataSource = new MatTableDataSource([res]);
        }
        else{
          console.log("KHONG CHO SV COI DIEM")
        }
      }
      else{
        this.dataSource = new MatTableDataSource([]);
      }
    })
  }

  // Table
  displayedColumns: string[] = ["maLopHocPhan", 'tenMonHoc', 'soTinChi', "diemTongKet", "thangDiem4",
    "diemChu", "xepLoai" ,"ghiChu","dat"
  ];
  dataSource!: MatTableDataSource<any>;

}

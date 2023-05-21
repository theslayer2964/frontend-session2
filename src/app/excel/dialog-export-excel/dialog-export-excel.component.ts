import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
  DS_Nhom_KLTN,
  DS_Nhom_KLTN_RA_HD_POSTER,
  KetQua_Nhom_KLTN,
  MailMerge_PhieuChamHD
} from "../../shared-service/FileNameExport";
import {FileGeneratorService} from "../../shared-service/file-generator.service";
import {NhomService} from "../../shared-service/nhom.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSelectChange} from "@angular/material/select";
import {HockyService} from "../../shared-service/hocky.service";
import {Observable} from "rxjs";
import {LopHocPhanService} from "../../shared-service/lop-hoc-phan.service";

@Component({
  selector: 'app-dialog-export-excel',
  templateUrl: './dialog-export-excel.component.html',
  styleUrls: ['./dialog-export-excel.component.scss']
})
export class DialogExportExcelComponent implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA) public editData: any,

      private dialogRef: MatDialogRef<DialogExportExcelComponent>,
      private hockyService: HockyService,
      private lopHocPhanService: LopHocPhanService) { }

  dsHocKy: any[];
  choBam: boolean = true;
  ngOnInit(): void {
    console.log(this.editData)
    this.getAllHocKy();
    this.getAllLopHP();
  }
  changeHocKy($event: MatSelectChange) {
    this.editData.ma =$event.value;
    this.choBam = false;
  }

  changeLopHP($event: MatSelectChange) {
    this.editData.ma = $event.value;
    this.choBam = false;
  }
  dsLopHP: any[];
  private getAllLopHP() {
    this.lopHocPhanService.layDsLop().subscribe({
      next: (res) => {
        this.dsLopHP = res;
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  private getAllHocKy() {
    this.hockyService.getHocKy().subscribe({
      next: (res) => {
        this.dsHocKy = res;
      }, error: (err) => {
        console.log(err)
      }
    })
  }

}

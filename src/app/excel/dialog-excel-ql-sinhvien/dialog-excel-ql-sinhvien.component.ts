import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {GiangvienService} from "../../shared-service/giangvien.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {SinhvienService} from "../../shared-service/sinhvien.service";
import {MatSelectChange} from "@angular/material/select";
import {LopHocPhanService} from "../../shared-service/lop-hoc-phan.service";

@Component({
  selector: 'app-dialog-excel-ql-sinhvien',
  templateUrl: './dialog-excel-ql-sinhvien.component.html',
  styleUrls: ['./dialog-excel-ql-sinhvien.component.scss']
})
export class DialogExcelQlSinhvienComponent implements OnInit {
  excelForm: FormGroup;
  file: any;
  excelName: any;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogExcelQlSinhvienComponent>,
              private sinhvienService:SinhvienService, private userService: UserAuthService,
              private lopHocPhanService: LopHocPhanService) { }

  ngOnInit(): void {
    this.excelForm = this.formBuilder.group({
      excelFile:[]
    })
    this.getAllLopHP();
  }
  maLopHP: any;
  changeLopHP($event: MatSelectChange) {
    this.maLopHP =$event.value

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

  getFile($event: any) {
    this.file = $event.target.files[0];
    this.excelName = this.file.name
  }
  importFile() {
    this.sinhvienService.addSinhVienExcel(this.file)
        .subscribe({
          next: (res) => {
            this.excelForm.reset();
            this.dialogRef.close()
            new NotificationsComponent().showNotification('success', 'Thêm danh sách sinh viên từ excel thành công');
          },
          error: () => {
            new NotificationsComponent().showNotification('danger', 'Thêm không thành công');
          }
        })
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {GiangvienService} from "../../shared-service/giangvien.service";

@Component({
  selector: 'app-dialog-excel-ql-giangvien',
  templateUrl: './dialog-excel-ql-giangvien.component.html',
  styleUrls: ['./dialog-excel-ql-giangvien.component.scss']
})
export class DialogExcelQlGiangvienComponent implements OnInit {
  excelForm: FormGroup;
  file: any;
  excelName: any;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogExcelQlGiangvienComponent>,
              private giangvienService: GiangvienService, private userService: UserAuthService) { }

  ngOnInit(): void {
    this.excelForm = this.formBuilder.group({
      excelFile:[]
    })
  }

  getFile($event: any) {
    this.file = $event.target.files[0];
    this.excelName = this.file.name
  }
  importFile() {
    this.giangvienService.addGiangVienExcel(this.file, this.userService.getUserInfo().maGiangVien)
        .subscribe({
          next: (res) => {
            this.excelForm.reset();
            this.dialogRef.close()
            new NotificationsComponent().showNotification('success', 'Thêm danh sách giảng viên từ excel thành công');
          },
          error: () => {
            new NotificationsComponent().showNotification('danger', 'Thêm không thành công');
          }
        })
  }

}

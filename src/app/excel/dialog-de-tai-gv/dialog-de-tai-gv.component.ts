import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-de-tai-gv',
  templateUrl: './dialog-de-tai-gv.component.html',
  styleUrls: ['./dialog-de-tai-gv.component.scss']
})
export class DialogDeTaiGVComponent implements OnInit {
  excelForm: FormGroup;
  file: any;
  excelName: any;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogDeTaiGVComponent>,
              private detaiService: DetaiService, private userService: UserAuthService) { }

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
    this.detaiService.addDeTaiExcel(this.file, this.userService.getUserInfo().maGiangVien)
        .subscribe({
          next: (res) => {
            this.excelForm.reset();
            this.dialogRef.close()
            new NotificationsComponent().showNotification('success', 'Thêm đề tài từ excel thành công');
          },
          error: () => {
            new NotificationsComponent().showNotification('danger', 'Không thể cập nhật đề tài');
          }
        })
  }
}

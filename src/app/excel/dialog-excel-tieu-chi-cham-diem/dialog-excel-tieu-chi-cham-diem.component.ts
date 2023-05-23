import { Component, OnInit } from '@angular/core';
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {GiangvienService} from "../../shared-service/giangvien.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {TieuchichamdiemService} from "../../shared-service/tieuchichamdiem.service";

@Component({
  selector: 'app-dialog-excel-tieu-chi-cham-diem',
  templateUrl: './dialog-excel-tieu-chi-cham-diem.component.html',
  styleUrls: ['./dialog-excel-tieu-chi-cham-diem.component.scss']
})
export class DialogExcelTieuChiChamDiemComponent implements OnInit {

  excelForm: FormGroup;
  file: any;
  excelName: any;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogExcelTieuChiChamDiemComponent>,
              private tieuChiChamDiemService: TieuchichamdiemService, private userService: UserAuthService) { }

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
    this.tieuChiChamDiemService.addTieuChiExcel(this.file)
        .subscribe({
          next: (res) => {
            this.excelForm.reset();
            this.dialogRef.close()
            new NotificationsComponent().showNotification('success', 'Thêm danh sách tiêu chí từ excel thành công');
          },
          error: () => {
            new NotificationsComponent().showNotification('danger', 'Thêm không thành công');
          }
        })
  }

}

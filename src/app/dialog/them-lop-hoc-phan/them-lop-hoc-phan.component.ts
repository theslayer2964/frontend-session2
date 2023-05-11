import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HockyService} from "../../shared-service/hocky.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LopHocPhanService} from "../../shared-service/lop-hoc-phan.service";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-them-lop-hoc-phan',
  templateUrl: './them-lop-hoc-phan.component.html',
  styleUrls: ['./them-lop-hoc-phan.component.scss']
})
export class ThemLopHocPhanComponent implements OnInit {

  giangVienForm!: FormGroup;
  actionBtn: string = "Lưu";
  constructor(  private formBuilder: FormBuilder,
                private hocKyService: HockyService,
                private lopHocPhanSer: LopHocPhanService,
                private dialogRef: MatDialogRef<ThemLopHocPhanComponent>,
                @Inject(MAT_DIALOG_DATA) public editData: any) { }

  dsPhong: any[];
  dsHocKy: any[];
  ngOnInit(): void {
    this.lopHocPhanSer.layPhong().subscribe(res => {
      this.dsPhong = res;
    })
    this.hocKyService.getHocKy().subscribe(res => {
      this.dsHocKy = res;
    })
    this.giangVienForm = this.formBuilder.group({
      tenLopHocPhan: ['', Validators.required],
      ghiChu: ['']

    })
  }
  hocKyHienTai: any;
  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3)
  }

  phong: any;
  changePhong($event: MatSelectChange) {
    this.phong = $event.value
  }
  addLopHP() {
    this.lopHocPhanSer.taoLopHocPhan({
      tenLopHocPhan: this.giangVienForm.get("tenLopHocPhan").value,
      phong: this.phong,
      maHocKy: this.hocKyHienTai,
      ghiChu:  this.giangVienForm.get("ghiChu").value
    }).subscribe(res => {
      console.log(res);
      this.giangVienForm.reset();
      this.dialogRef.close('save');
      console.log("GV - THEm DETAI:", this.giangVienForm.value);
      new NotificationsComponent().showNotification('success', 'Thêm đề tài thành công');
    })
  }
}

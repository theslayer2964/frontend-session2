import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GiangvienService} from "../../shared-service/giangvien.service";
import {ThemLichTransferService} from "../../transfer-data-service/them-lich-transfer.service";
import {Subject} from "rxjs";
import {MatSelectChange} from "@angular/material/select";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {LichService} from "../../shared-service/lich/lich.service";

@Component({
  selector: 'app-ql-xep-tkb-hd',
  templateUrl: './ql-xep-tkb-hd.component.html',
  styleUrls: ['./ql-xep-tkb-hd.component.scss']
})
export class QlXepTKBHDComponent implements OnInit {
  nhomDKGVHD!: FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<QlXepTKBHDComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              public giangvienService: GiangvienService,
              public themLichTransfer: ThemLichTransferService,
              public lichService: LichService) { }

  mahocKyHienTai: any;
  ngOnInit(): void {
    this.themLichTransfer.hockyBehaviorSubject.subscribe(res => {
      this.mahocKyHienTai = res;
    })
    this.lichService.tachNgay().subscribe(res => {
      this.dsNgay = res;
      console.log("DS nGay", this.dsNgay);
    })
    this.nhomDKGVHD= this.formBuilder.group({
      dsMaGiangVienPB:['',Validators.required],
      ngay: ['', Validators.required],
      phong: ['', Validators.required],
      tiet:['', Validators.required]
    });

    if(this.editData){
      // this.nhomDKGVPB.controls['dsGV'].setValue(['11592401', '11692401']);
      // this.nhomDKGVPB.controls['ngayCham'].setValue();
      // this.nhomDKGVPB.controls['phong'].setValue();
      // this.nhomDKGVPB.controls['tietBatDau'].setValue();
      // this.nhomDKGVPB.controls['tietKetThuc'].setValue();
      this.actionBtn = "Cập nhật"
    }
  }
  showPhong = false;
  dsNgay: any;
  ngayDcChon:any;
  changeNgay($event: MatSelectChange) {
    this.ngayDcChon = $event.value;
    if(this.ngayDcChon && this.tietDcChon){
      this.lichService.tachPhong(this.ngayDcChon, this.tietDcChon).subscribe(res => {
        this.dsPhong = res;
        this.showPhong = true;
      })
    }
  }
  tietDcChon:any;
  changeTiet($event: MatSelectChange) {
    this.tietDcChon = $event.value
    if(this.ngayDcChon && this.tietDcChon){
      this.lichService.tachPhong(this.ngayDcChon, this.tietDcChon).subscribe(res => {
        this.dsPhong = res;
        this.showPhong = true;
      })
    }
  }
  dsPhong: any;
  dsGV : any;
  changePhong($event: MatSelectChange) {
    if($event.value){
      this.lichService.tachGiangVien(this.ngayDcChon, this.tietDcChon, $event.value).subscribe( res => {
            this.dsGV = res;
            this.showGV = true;
          }
      )
    }
  }
  showGV = false;
  onDropdownList($event: MatSelectChange) {
    if($event.value.length > 3){
      new NotificationsComponent().showNotification("danger","Yêu cầu chỉ 3 giảng viên phản biện")
    }
  }

  addTKBPB() {
    console.log("LICH ne:", this.nhomDKGVHD.value);
    this.lichService.xepLichGiangVienPB(this.nhomDKGVHD.value).subscribe(res => {
      this.dialogRef.close();
      new NotificationsComponent().showNotification("success","Xếp lịch thành công")
    })
  }
}

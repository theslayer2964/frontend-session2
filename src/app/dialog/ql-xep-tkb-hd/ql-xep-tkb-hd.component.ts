import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GiangvienService} from "../../shared-service/giangvien.service";
import {ThemLichTransferService} from "../../transfer-data-service/them-lich-transfer.service";
import {Subject} from "rxjs";
import {MatSelectChange} from "@angular/material/select";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

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
              public themLichTransfer: ThemLichTransferService) { }

  mahocKyHienTai: any;
  ngOnInit(): void {
    this.themLichTransfer.hockyBehaviorSubject.subscribe(res => {
      this.mahocKyHienTai = res;
    })
    this.getDSGiangVien();
    this.nhomDKGVHD= this.formBuilder.group({
      dsGV:['',Validators.required],
      ngayCham: ['', Validators.required],
      phong: ['', Validators.required],
      tietBatDau:['', Validators.required],
      tietKetThuc:['', Validators.required]
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

  dsTenGV: any = [];
  destroy$ = new Subject();
  private getDSGiangVien() {
    this.giangvienService.getDSGV().subscribe(res => {

      this.dsTenGV = res;
      this.destroy$.next(this.dsTenGV);
    })
    this.destroy$.subscribe(res => {
      this.toppingList = res;
    })
  }
  toppingList: any;
  dsGVPB = [];
  onDropdownList($event: MatSelectChange) {
    this.dsGVPB = $event.value;
    if($event.value.length > 2){
      new NotificationsComponent().showNotification("danger","Yêu cầu chỉ 3 giảng viên hội đồng")
    }
  }

  addTKBPB() {
    console.log("LICH ne:", this.nhomDKGVHD.value);
  }

  chonPhong() {
    this.getDSGVRanhVaoNgayGio("PB",null,null,null,null);
  }

  getDSGVRanhVaoNgayGio(loaiLich: any,ngayCham: any, tietBatDau:any, tietKetThuc:any, phong: any){
    /////............
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {DeTai} from "../../giangvien/detai/DeTai.models";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {Nhom} from "../../sinhvien/Nhom.models";
import {NhomService} from "../../shared-service/nhom.service";

@Component({
  selector: 'app-them-nhom',
  templateUrl: './them-nhom.component.html',
  styleUrls: ['./them-nhom.component.scss']
})
export class ThemNhomComponent implements OnInit {

  actionBtn : string = "Save";

  dsDeTai: DeTai[];

  dsMaSinhVien: any[] = [];
  constructor(private formBuilder: FormBuilder,
              private detaiService: DetaiService,
              private hocKyService: HockyService,
              private userAuthService: UserAuthService,

              private nhomService: NhomService,
              private dialogRef: MatDialogRef<ThemNhomComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  ngOnInit(): void {
    this.hocKyService.getHocKyMoiNhat().subscribe({
      next: (res) => {
        this.hocKy = res;
        console.log(this.hocKy);
        this.getDeTaiDaDuyet(this.hocKy.maHocKy, this.hocKy.soHocKy);
      }
    });
    this.formNhom = this.formBuilder.group({
      // maDeTai: [''],
      maSoSv1: ['', Validators.required],
      // maSoSv2: ['', Validators.required],
      // emailSv1: ['', Validators.required],
      // emailSv2: ['', Validators.required],
      // soDTSv1: ['', Validators.required],
      // soDTSv2: ['', Validators.required],
    })
    console.log(this.editData)
    if (this.editData) {
      // this.productForm.controls['maDeTai'].setValue(this.editData.maDeTai);
      this.formNhom.controls['maSoSv1'].setValue(this.editData.maSoSv1);
      this.formNhom.controls['maSoSv2'].setValue(this.editData.maSoSv2);
      this.formNhom.controls['emailSv1'].setValue(this.editData.emailSv1);
      this.formNhom.controls['emailSv2'].setValue(this.editData.emailSv2);
      this.formNhom.controls['soDTSv1'].setValue(this.editData.soDTSv1);
      this.formNhom.controls['soDTSv2'].setValue(this.editData.soDTSv2);
      this.actionBtn = "Update"
    }
  }

  formNhom!: FormGroup;

  dangKyNhom() {
    console.log("GV - THEm NHOM:", this.formNhom.value);
    if(this.editData == null){
      if (this.formNhom.valid) {
        this.detaiService.postDeTai(this.formNhom.value)
            .subscribe({
              next: (res) => {
                this.formNhom.reset();
                this.dialogRef.close('save');
              },
              error: () => {
                alert("XXX")
              }
            })
      }
    }
    else{
      this.detaiService.updateDeTai(this.formNhom.value, this.editData.id)
          .subscribe({
            next: (res) => {
              this.formNhom.reset();
              this.dialogRef.close('update');
            },
            error: () => {
              alert("XXX")
            }
          })
      this.editData = null;
    }
  }

  private maDeTaiHienTai: any;

  changeDeTai($event: MatSelectChange) {
    this.maDeTaiHienTai = $event.value.maDeTai
    console.log($event.value)
  }

  data: any;
  hocKy: HocKy;
  private getDeTaiDaDuyet(maHocKy: any, soHocKy: any) {
    console.log("ma" + maHocKy + soHocKy);
    this.detaiService.getDeTaiRoleGV({
      maGiangVien: this.userAuthService.getUserInfo().maGiangVien,
      maHocKy: maHocKy,
      soHocKy: soHocKy,
      trangThai: 2
    }).subscribe({
      next: (res) => {
        this.dsDeTai = res;
        console.log(this.dsDeTai);
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  nhom: Nhom
  addNhom() {
    if(this.editData == null){
      console.log("GV - THEm Nhom: ", this.maDeTaiHienTai);
      this.dsMaSinhVien.push(this.formNhom.get('maSoSv1').value)
      if(this.formNhom.get('maSoSv2') != null) {
        this.dsMaSinhVien.push(this.formNhom.get('maSoSv2').value)
      }

      if(this.maDeTaiHienTai == undefined) {
        this.maDeTaiHienTai = null;
      }

      if (this.formNhom.valid) {
        this.nhomService.dangKyNhom({
          dsMaSinhVien : this.dsMaSinhVien,
          maDeTai: this.maDeTaiHienTai})
            .subscribe({
              next: (res) => {
                this.formNhom.reset();
                this.dialogRef.close('save');
                new NotificationsComponent().showNotification('success', 'Thêm nhóm thành công');
              },
              error: () => {
                new NotificationsComponent().showNotification('DANGER', 'Không thể thêm nhóm');
              }
            })
      }
    }
  }

}

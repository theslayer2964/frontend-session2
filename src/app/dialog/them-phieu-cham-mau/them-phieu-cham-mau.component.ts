import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TieuchichamdiemService} from "../../shared-service/tieuchichamdiem.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatSelectChange} from "@angular/material/select";
import {Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

interface GiangVien {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-them-phieu-cham-mau',
  templateUrl: './them-phieu-cham-mau.component.html',
  styleUrls: ['./them-phieu-cham-mau.component.scss']
})
export class ThemPhieuChamMauComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,

              private tieuChiChamDiem: TieuchichamdiemService,
              private dialogRef: MatDialogRef<ThemPhieuChamMauComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  sinhVienForm!: FormGroup;
  actionBtn: string = "Save"

  ngOnInit(): void {
    this.getAllTieuChiChamDiem()
    this.sinhVienForm = this.formBuilder.group({
      tenPhieuCham: ['', Validators.required],
    })
    console.log(this.editData)
  }
  dsTieuChi: any = [];

  addSinhVien() {

      if (this.sinhVienForm.valid && this.dsMaTieuChi.length > 0) {
        console.log("GV - THEm DETAI:", this.sinhVienForm.value);
        this.tieuChiChamDiem.themPhieuChamMau({
          tenPhieuCham: this.sinhVienForm.get('tenPhieuCham').value,
          tieuChiChamDiems: this.dsMaTieuChi,
          vaiTroDung: this.giangVien
        }).subscribe({
              next: (res) => {
                this.sinhVienForm.reset();
                this.dialogRef.close('save');
                console.log("GV - THEm DETAI:", res);
                new NotificationsComponent().showNotification('success', 'Thêm phiếu thành công');
              },
              error: () => {
                new NotificationsComponent().showNotification('danger', 'Không thể thêm phiếu');
              }
            })
      }
      else {
        new NotificationsComponent().showNotification('danger', 'Xin hãy nhập đủ thông tin');
      }
    }
  dsVaiTro: GiangVien[] = [
    {value: "HD", viewValue:"Giảng viên hướng dẫn" },
    {value: "PB", viewValue:"Giảng viên phản biện" },
    {value: "CT", viewValue:"Chủ tịch hội đồng" },
    {value: "TK", viewValue:"Thư ký hướng dẫn" },
  ];
  private getAllTieuChiChamDiem() {
    this.tieuChiChamDiem.layHetTieuChi().subscribe({
      next: (res) => {
        this.dsTieuChi = res;
        this.toppingList = this.dsTieuChi
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  toppings = new FormControl('');
  toppingList: any[] = this.dsTieuChi
  dsMaTieuChi = [];
  onDropdownList($event: MatSelectChange) {
    this.dsMaTieuChi = $event.value;
    console.log("DS GUI VE:", this.dsMaTieuChi);

  }
  giangVien :any;

  changeGiangVien($event: MatSelectChange) {
    this.giangVien = $event.value;
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-them-de-tai-gv',
  templateUrl: './them-de-tai-gv.component.html',
  styleUrls: ['./them-de-tai-gv.component.css']
})
export class ThemDeTaiGvComponent implements OnInit {
  actionBtn : string = "Save"
  constructor(private formBuilder: FormBuilder,
              private detaiService: DetaiService,
              private dialogRef: MatDialogRef<ThemDeTaiGvComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      // maDeTai: [''],
      gioiHanSoNhomThucHien: ['', Validators.required],
      moTa: ['', Validators.required],
      mucTieuDeTai: ['', Validators.required],
      sanPhamDuKien: ['', Validators.required],
      tenDeTai: ['', Validators.required],
      yeuCauDauVao: ['', Validators.required],
      tinhTrang: ['', Validators.required]
    })
    console.log(this.editData)
    if (this.editData) {
      // this.productForm.controls['maDeTai'].setValue(this.editData.maDeTai);
      this.productForm.controls['gioiHanSoNhomThucHien'].setValue(this.editData.gioiHanSoNhomThucHien);
      this.productForm.controls['moTa'].setValue(this.editData.moTa);
      this.productForm.controls['mucTieuDeTai'].setValue(this.editData.mucTieuDeTai);
      this.productForm.controls['sanPhamDuKien'].setValue(this.editData.sanPhamDuKien);
      this.productForm.controls['tenDeTai'].setValue(this.editData.tenDeTai);
      this.productForm.controls['yeuCauDauVao'].setValue(this.editData.yeuCauDauVao);
      this.actionBtn = "Update"
    }
  }

  productForm!: FormGroup;

  addDeTai() {
    console.log("GV - THEm DETAI:", this.productForm.value);
    if(this.editData == null){
      if (this.productForm.valid) {
        this.detaiService.postDeTai(this.productForm.value)
          .subscribe({
            next: (res) => {
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("XXX")
            }
          })
      }
    }
    else{
        this.detaiService.updateDeTai(this.productForm.value, this.editData.id)
          .subscribe({
            next: (res) => {
              this.productForm.reset();
              this.dialogRef.close('update');
            },
            error: () => {
              alert("XXX")
            }
          })
      this.editData = null;
      }
    }
}

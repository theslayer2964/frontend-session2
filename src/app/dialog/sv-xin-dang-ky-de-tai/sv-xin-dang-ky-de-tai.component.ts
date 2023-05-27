import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-sv-xin-dang-ky-de-tai',
  templateUrl: './sv-xin-dang-ky-de-tai.component.html',
  styleUrls: ['./sv-xin-dang-ky-de-tai.component.scss']
})
export class SvXinDangKyDeTaiComponent implements OnInit {
  formXinThucHienDetai: FormGroup;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<SvXinDangKyDeTaiComponent>) { }

  ngOnInit(): void {
    this.formXinThucHienDetai = this.formBuilder.group({
      kienThuc:[''],
      kynang:[''],
      thaido:['']
    });
  }

  guiDeTai() {
    console.log("MA DE TAI XIN DK:", this.editData.deTai.maDeTai);
    console.log("FORM XIN DO:", this.formXinThucHienDetai.value);
  }
}

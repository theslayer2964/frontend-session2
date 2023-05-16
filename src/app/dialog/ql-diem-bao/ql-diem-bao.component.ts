import {Component, Inject, OnInit} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-ql-diem-bao',
  templateUrl: './ql-diem-bao.component.html',
  styleUrls: ['./ql-diem-bao.component.scss']
})
export class QlDiemBaoComponent implements OnInit {

  constructor(private dialog: MatDialogRef<QlDiemBaoComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  productForm!: FormGroup;
  actionBtn:string = "Xác nhận";
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      diem: [1,Validators.required],
    });
  }

  themDiemBaiBao() {
    console.log(this.data + this.productForm.value.diem);

  }
}

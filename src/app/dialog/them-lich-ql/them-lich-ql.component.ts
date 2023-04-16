import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-them-lich-ql',
  templateUrl: './them-lich-ql.component.html',
  styleUrls: ['./them-lich-ql.component.scss']
})
export class ThemLichQlComponent implements OnInit {
  schedularForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private detaiService: DetaiService,
              private dialogRef: MatDialogRef<ThemLichQlComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.schedularForm = this.formBuilder.group({
      title: ['', Validators.required],
      teacher: ['', Validators.required],
      lession: ['', Validators.required],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required],
      room: ['', Validators.required],
      comment: ['', Validators.required]
    })
    console.log(this.data)
  }
  dsGV: string[] = ["Nguyễn Thị Hoàng Khánh"," Nguyễn Thị Hạnh"," Nguyễn Trọng Tiến", "Phạm Quảng Tri"];
    addSchedule() {
      console.log("LICH - QL:",this.schedularForm.value)
    }
}

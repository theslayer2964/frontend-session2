import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-thongbao',
  templateUrl: './thongbao.component.html',
  styleUrls: ['./thongbao.component.scss']
})
export class ThongbaoComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ThongbaoComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {

  }

  choPhepThamGiaNhom() {

  }
}

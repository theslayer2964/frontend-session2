import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dangky-cosan',
  templateUrl: './dangky-cosan.component.html',
  styleUrls: ['./dangky-cosan.component.scss']
})
export class DangkyCosanComponent implements OnInit {

  actionBtn : string = "Có";

  maSinhVien1: String;

  formNhom!: FormGroup;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

}

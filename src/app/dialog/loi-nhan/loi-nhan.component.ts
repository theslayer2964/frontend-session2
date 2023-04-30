import {Component, Inject, OnInit} from '@angular/core';
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {NhomService} from "../../shared-service/nhom.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DuyetdetaiComponent} from "../duyetdetai/duyetdetai.component";

@Component({
  selector: 'app-loi-nhan',
  templateUrl: './loi-nhan.component.html',
  styleUrls: ['./loi-nhan.component.scss']
})
export class LoiNhanComponent implements OnInit {

  constructor( private userAuthService: UserAuthService,
               private nhomService: NhomService,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private dialogRef: MatDialogRef<DuyetdetaiComponent>,) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}

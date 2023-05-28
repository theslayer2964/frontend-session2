import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";
import {DetaiSvService} from "../../sinhvien/sinhvien-service/detai-sv.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-quanly-tientrinh-detai-gan',
  templateUrl: './quanly-tientrinh-detai-gan.component.html',
  styleUrls: ['./quanly-tientrinh-detai-gan.component.scss']
})
export class QuanlyTientrinhDetaiGanComponent implements OnInit {

  public ganNhomChoDeTaiForm: FormGroup;

  isCheckAll: boolean = false;

  constructor(private fb: FormBuilder, private quanlyService: QuanlyLichService, private detaiSVService: DetaiSvService ) {
    this.ganNhomChoDeTaiForm = this.fb.group({
      tableRows: this.fb.array([],[Validators.required])
    });
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      maDeTai: ['',[Validators.required,Validators.minLength(3)]],
      tenDeTai: ['',[Validators.required]],
      gvhd:[''],
      doKho: [''],
      soLuongCon: [''],
      nhom: [''],
      ischecked: [false]
    });
  }

  get getFormControls() {
    const control = this.ganNhomChoDeTaiForm.get('tableRows') as FormArray;
    return control;
  }

  addRow() {
    const control =  this.ganNhomChoDeTaiForm.get('tableRows') as FormArray;
    control.push(this.createFormGroup());
  }

  checkAll(checkVal: boolean) {

    this.getFormControls.controls.forEach(formGroup => {
      formGroup.get('ischecked')?.setValue(checkVal);
    });
  }

  onStatusChange(event:any, index: number) {

  }

  removeDeTai(index:number) {
    const control =  this.ganNhomChoDeTaiForm.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  onSaveForm() {
    const formValue = this.ganNhomChoDeTaiForm.value;
    formValue.tableRows.forEach(detai =>{
      if(detai.nhom!=""){
        this.detaiSVService.dangKyDeTai({maNhom: detai.nhom, maDeTai: detai.maDeTai}).subscribe( res => {
          new NotificationsComponent().showNotification('success', 'Gán đề tài thành công');

        });
      }
    });
  }
  ngOnInit(): void {
    this.getDSNhomChuaDKDeTai();
    this.quanlyService.layDSDeTaiChuaAiDangKy().subscribe((res:[]) => {
      res.forEach(detai => {
        this.addRow();
      })
    this.setValueDSDeTai(res);
    });

  }


  setValueDSDeTai(res){
    var data = {
      tableRows: res
    }
    this.ganNhomChoDeTaiForm.patchValue(data);
  }

  nhomChuaDK;
  private getDSNhomChuaDKDeTai() {
    this.quanlyService.layDSNhomChuaChiuDK().subscribe(res =>{
      this.nhomChuaDK = res;
    })
  }
}

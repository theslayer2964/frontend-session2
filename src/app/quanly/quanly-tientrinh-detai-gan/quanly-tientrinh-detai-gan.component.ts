import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-quanly-tientrinh-detai-gan',
  templateUrl: './quanly-tientrinh-detai-gan.component.html',
  styleUrls: ['./quanly-tientrinh-detai-gan.component.scss']
})
export class QuanlyTientrinhDetaiGanComponent implements OnInit {

  public ganNhomChoDeTaiForm: FormGroup;

  isCheckAll: boolean = false;

  constructor(private fb: FormBuilder) {
    this.ganNhomChoDeTaiForm = this.fb.group({
      tableRows: this.fb.array([],[Validators.required])
    });
    this.addRow();
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

  }
  ngOnInit(): void {
  }

}

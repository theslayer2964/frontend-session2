import { Component, OnInit } from '@angular/core';
import {HocKy} from "../../shared-service/HocKy.models";
import {HockyService} from "../../shared-service/hocky.service";
import {MatSelectChange} from "@angular/material/select";
import {LichService} from "../../shared-service/lich/lich.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-ql-kltn',
  templateUrl: './ql-kltn.component.html',
  styleUrls: ['./ql-kltn.component.scss']
})
export class QlKltnComponent implements OnInit {

  // dsHocKy: HocKy[];
  //
  // constructor(private hocKyService: HockyService, private lichServer: LichService) { }
  //
  // ngOnInit(): void {
  //   this.getAllHocKy();
  // }
  // private getAllHocKy() {
  //   this.hocKyService.getHocKy().subscribe({
  //     next: (res) => {
  //       this.dsHocKy = res;
  //     }, error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }
  // private hocKyHienTai: any;
  // private soHocKy: any;
  //
  // changeHocKy($event: MatSelectChange) {
  //   this.hocKyHienTai = $event.value.toString().slice(0, 3)
  //   this.soHocKy = $event.value.toString().slice(2)
  //
  //   this.lichServer.getLichTheoHocKyVaMaGV(this.hocKyHienTai, null, "ROLE_GIANGVIEN").subscribe({
  //         next: (res) => {
  //           // this.dsKeHoachGV = res
  //         }
  //       }
  //   )
  //   this.lichServer.getLichTheoHocKyVaMaGV(this.hocKyHienTai, null, "ROLE_SINHVIEN").subscribe({
  //         next: (res) => {
  //           // this.dsKeHoachSV = res
  //         }
  //       }
  //   )
  // }

  public employeeForm: FormGroup;

  ngOnInit() {
  }

  isCheckAll: boolean = false;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      tableRows: this.fb.array([],[Validators.required])
    });
    this.addRow();
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      firstname: ['',[Validators.required,Validators.minLength(3)]],
      lastname: ['',[Validators.required]],
      city:[''],
      state: [''],
      status: [''],
      ischecked: [false]
    });
  }

  get getFormControls() {
    const control = this.employeeForm.get('tableRows') as FormArray;
    return control;
  }

  addRow() {
    const control =  this.employeeForm.get('tableRows') as FormArray;
    control.push(this.createFormGroup());
  }

  checkAll(checkVal: boolean) {

    this.getFormControls.controls.forEach(formGroup => {
      formGroup.get('ischecked')?.setValue(checkVal);
    });
  }

  onStatusChange(event:any, index: number) {
    debugger
    if(event.target.value == 'deactive'){
      const control =  this.employeeForm.get('tableRows') as FormArray;
      control.controls[index].get('state')?.disable();
      control.controls[index].get('city')?.disable();
    } else {
      const control =  this.employeeForm.get('tableRows') as FormArray;
      control.controls[index].get('state')?.enable();
      control.controls[index].get('city')?.enable();
    }
  }

  removeEmployee(index:number) {
    const control =  this.employeeForm.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  onSaveForm() {
    const formValue = this.employeeForm.value;
    console.log("ON SAVE:", formValue);
  }
}

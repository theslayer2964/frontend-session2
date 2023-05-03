import {Component, OnInit} from '@angular/core';
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

    public employeeForm: FormGroup;

    ngOnInit() {
    }


    constructor(private fb: FormBuilder) {
        this.employeeForm = this.fb.group({
            tableRows: this.fb.array([], [Validators.required])
        });
        this.addRow();
        this.addRow();
        this.addRow();
    }

    setValue() {
        var data = {
            tableRows: [
                {
                    ngay: 'lala',
                    tiet: 'meoem',
                    nhom: '',
                    phong: 'xxx'
                },
                {
                    ngay: 'lala',
                    tiet: 'meoem',
                    nhom: '',
                    phong: 'xxx'
                }
            ]
        }
        this.employeeForm.patchValue(data);
    }

    createFormGroup(): FormGroup {
        return this.fb.group({
            ngay: ['', [Validators.required, Validators.minLength(3)]],
            tiet: ['', [Validators.required]],
            nhom: [''],
            phong: ['']
        });
    }

    get getFormControls() {
        const control = this.employeeForm.get('tableRows') as FormArray;
        return control;
    }

    addRow() {
        const control = this.employeeForm.get('tableRows') as FormArray;
        control.push(this.createFormGroup());
    }

    onStatusChange(event: any, index: number) {
        debugger
        if (event.target.value == 'deactive') {
            const control = this.employeeForm.get('tableRows') as FormArray;
            control.controls[index].get('state')?.disable();
            control.controls[index].get('city')?.disable();
        } else {
            const control = this.employeeForm.get('tableRows') as FormArray;
            control.controls[index].get('state')?.enable();
            control.controls[index].get('city')?.enable();
        }
    }

    removeEmployee(index: number) {
        const control = this.employeeForm.get('tableRows') as FormArray;
        control.removeAt(index);
    }

    onSaveForm() {
        const formValue = this.employeeForm.value;
        console.log("ON SAVE:", formValue);
    }
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SinhvienService} from "../../shared-service/sinhvien.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HockyService} from "../../shared-service/hocky.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {request} from "express";

@Component({
    selector: 'app-them-hocky',
    templateUrl: './them-hocky.component.html',
    styleUrls: ['./them-hocky.component.scss']
})
export class ThemHockyComponent implements OnInit {

    giangVienForm!: FormGroup;
    actionBtn: string = "Save"

    constructor(private formBuilder: FormBuilder,
                private hocKyService: HockyService,
                private dialogRef: MatDialogRef<ThemHockyComponent>,
                @Inject(MAT_DIALOG_DATA) public editData: any) {
    }

    ngOnInit(): void {
        this.giangVienForm = this.formBuilder.group({
            thoiGianBatDau: ['', Validators.required],
            thoiGianKetThuc: ['', Validators.required]
        })
    }

    addHocKy() {
        console.log("save HOcKy " + this.giangVienForm.value)

        if (this.giangVienForm.valid) {
            this.hocKyService.postHocKy(this.giangVienForm.value)
                .subscribe({
                    next: (res) => {
                        this.giangVienForm.reset();
                        this.dialogRef.close('save');
                        console.log("QL - THEm HocKy:", this.giangVienForm.value);
                        new NotificationsComponent().showNotification('success', 'Thêm học ky thành công');
                    },
                    error: () => {
                        new NotificationsComponent().showNotification('DANGER', 'Không thể thêm học ky');
                    }
                })
        }

    }
}

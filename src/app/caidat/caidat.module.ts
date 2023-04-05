import {NgModule} from "@angular/core";
import { HethongComponent } from './hethong/hethong.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CaiDatRoutes} from "./caidat.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CaiDatRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatDatepickerModule
    ],
    declarations: [
    HethongComponent
  ]
})

export class CatDatModule {}
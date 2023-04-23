import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {QuanlyPcGvRouting} from "./quanly-pc-gv.routing";
import {QlPcContainerComponent} from "./ql-pc-container/ql-pc-container.component";
import {QlPcSidebarComponent} from "./ql-pc-sidebar/ql-pc-sidebar.component";
import {QlPcGvpbComponent} from "./ql-pc-gvpb/ql-pc-gvpb.component";
import {QlPcGvhdComponent} from "./ql-pc-gvhd/ql-pc-gvhd.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(QuanlyPcGvRouting),
        FormsModule,
        MatSidenavModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule
    ],
    declarations: [
        QlPcContainerComponent,
        QlPcSidebarComponent,
        QlPcGvpbComponent,
        QlPcGvhdComponent
    ],
    bootstrap: []
})
export class QuanlyPcGvModule{

}
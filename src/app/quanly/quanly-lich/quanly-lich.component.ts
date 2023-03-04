import { Component, OnInit } from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {MatSelectChange} from "@angular/material/select";
import {ThemDeTaiGvComponent} from "../../dialog/them-de-tai-gv/them-de-tai-gv.component";
import {ThemLichQlComponent} from "../../dialog/them-lich-ql/them-lich-ql.component";
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {HockyService} from "../../shared-service/hocky.service";

@Component({
  selector: 'app-quanly-lich',
  templateUrl: './quanly-lich.component.html',
  styleUrls: ['./quanly-lich.component.scss']
})
export class QuanlyLichComponent implements OnInit {
  presentDays: number = 0;
  absentDays: number = 0;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.events.forEach((e: {[x:string]: string}) => {
      if(e["title"] == 'Present'){
        this.presentDays++;
      }
      else{
        this.absentDays++;
      }
      console.log(this.presentDays)
      console.log(this.absentDays)
    })
  }
  events: any = [
    {title: "Present", date:'2023-03-03', color:'#000FF'},
    {title: "Past", date:'2023-03-02', color:'#000FF'},
    {title: "Future", date:'2023-03-01', color:'#000FF'}
  ]
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events:this.events
  };


  changeVaiTro($event: MatSelectChange) {
    console.log($event.value)
  }

  applyFilter($event: KeyboardEvent) {

  }

  openDialog() {
    this.dialog.open(ThemLichQlComponent, {}).afterClosed().subscribe(val => {

    })
  }
}

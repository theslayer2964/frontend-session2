import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {createEventId} from "../../quanly-lich/quanly-lich2/event-utils";
import {LichService} from "../../shared-service/lich/lich.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {HockyService} from "../../shared-service/hocky.service";
import {Subject} from "rxjs";
import {GvChamdiemComponent} from "../gv-chamdiem/gv-chamdiem.component";
import {MatDialog} from "@angular/material/dialog";
import {GiangvienService} from "../../giangvien/giangvien-service/giangvien.service";

@Component({
  selector: 'app-gv-show-callendar',
  templateUrl: './gv-show-callendar.component.html',
  styleUrls: ['./gv-show-callendar.component.scss']
})
export class GvShowCallendarComponent implements OnInit {
  calendarVisible = true;

  constructor(public dialog: MatDialog, private changeDetector: ChangeDetectorRef, private lichService: LichService,
              private userAuthService: UserAuthService, private hockyService: HockyService,
              private giangvienService: GiangvienService) {
  }

  destroy$ = new Subject();
  data$: any[] = [];
  hocKyHienHanh: any;
  ngOnInit(): void {
    let role = this.userAuthService.getRoles()[0];

    let maHocKy;
    this.hockyService.getHocKyMoiNhat().subscribe(res => {
      maHocKy = res.maHocKy;
      this.hocKyHienHanh = res.maHocKy;
      this.destroy$.next(maHocKy);
    });
    if (role.roleName == "ROLE_GIANGVIEN") {
      console.log("GV _ LICH _ TUI NE");
      let maGV = this.userAuthService.getUserInfo().maGiangVien;
      this.destroy$.subscribe(hocky => {
        this.lichService.getLichPB(hocky, maGV, "ROLE_GIANGVIEN").subscribe(res => {
          let a = [];
          res.forEach(data => {
            if (data.dsNgayThucHienKhoaLuan.length <= 0 && data.maLoaiLich == 3) {
              a.push({
                id: data.id,
                start: new Date(data.thoiGianBatDau).toISOString(),
                end: new Date(data.thoiGianKetThuc).toISOString(),
                title: data.tenKeHoach + "|" + data.phong + "|" + data.nhomSinhVien.tenNhom + "|" +
                  data.nhomGiangVienPb[0].tenGiangVien + ", " + data.nhomGiangVienPb[1].tenGiangVien + "|" + data.nhomSinhVien.maNhom ,
                allDay: false,
                backgroundColor: "#3597ea",
              })
            }
          })
          this.data$ = a
          console.log("MAP:", this.data$);
        })
      });
    }
  }

  calendarOptions: CalendarOptions = {
    locale: 'vi',
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'},
    initialView: 'timeGridWeek',
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: false,
    dayMaxEvents: true,
    height: '100%',
    contentHeight:'auto',
    // select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this),
    // eventResize:
  };

  handleEventClick(clickInfo: EventClickArg) {
    console.log("truyen ne", clickInfo.event.title.split("|")[4]);
    let data = {
      maNguoiDung: this.userAuthService.getUserInfo().maGiangVien,
    }
    this.giangvienService.getDSSVVaiTroCuThe(data).subscribe((res:[]) => {
      res.forEach((nhom:any) => {
        if(nhom.maNhom == clickInfo.event.title.split("|")[4]){
          this.dialog.open(GvChamdiemComponent, {
            data: nhom,
            width:"1150px"
          }).afterClosed().subscribe(res => {
            /// cont
          });
        }
      })
    });
  }
}

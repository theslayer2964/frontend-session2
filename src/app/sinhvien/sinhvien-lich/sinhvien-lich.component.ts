import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LichService} from "../../shared-service/lich/lich.service";
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {createEventId} from "../../quanly-lich/quanly-lich2/event-utils";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {HockyService} from "../../shared-service/hocky.service";
import {Subject} from "rxjs";

@Component({
    selector: 'app-sinhvien-lich',
    templateUrl: './sinhvien-lich.component.html',
    styleUrls: ['./sinhvien-lich.component.scss']
})
export class SinhvienLichComponent implements OnInit {

    calendarVisible = true;

    constructor(private changeDetector: ChangeDetectorRef, private lichService: LichService,
                private userAuthService: UserAuthService, private hockyService: HockyService) {
    }
    destroy$ = new Subject();
    ngOnInit(): void {
        let role = this.userAuthService.getRoles()[0];

        let maHocKy;
        this.hockyService.getHocKyMoiNhat().subscribe(res => {
            maHocKy = res.maHocKy;
            this.destroy$.next(maHocKy);
        });
        if (role.roleName == "ROLE_GIANGVIEN") {
            let maGV = this.userAuthService.getUserInfo().maGiangVien;
            this.destroy$.subscribe(hocky => {
                    this.lichService.getLichTheoHocKyVaMaGV(hocky, maGV, "ROLE_GIANGVIEN").subscribe(res => {
                    let a = [];
                    res.forEach(data => {
                        if (data.dsNgayThucHienKhoaLuan.length <= 0) {
                            a.push({
                                id: data.id,
                                start: new Date(data.thoiGianBatDau).toISOString().replace(/T.*$/, ''),
                                end: new Date(data.thoiGianKetThuc).toISOString().replace(/T.*$/, ''),
                                title: data.tenKeHoach,
                                allDay:true,
                                backgroundColor:"green"
                            })
                        }
                        // else {
                        //     a.push({
                        //         id: data.id,
                        //         start: new Date(data.thoiGianBatDau).toISOString().replace(/T.*$/, ''),
                        //         end: new Date(data.thoiGianKetThuc).toISOString().replace(/T.*$/, ''),
                        //         title: data.tenKeHoach,
                        //         allDay:true,
                        //         backgroundColor:"green",
                        //         daysOfWeek: data.dsNgayThucHienKhoaLuan
                        //     })
                        // }

                    })
                    this.data$ = a;
                    console.log("MAP:",this.data$);
                })
            });

        } else if (role.roleName == "ROLE_SINHVIEN") {
            console.log("TUI NE");
            let maSV = this.userAuthService.getUserInfo().maSinhVien;
            this.destroy$.subscribe(hocky => {
                this.lichService.getLichTheoHocKyVaMaGV(hocky, maSV, "ROLE_SINHVIEN").subscribe(res => {
                    let a = [];
                    res.forEach(data => {
                        if (data.dsNgayThucHienKhoaLuan.length <= 0) {
                            a.push({
                                id: data.id,
                                start: new Date(data.thoiGianBatDau).toISOString().replace(/T.*$/, ''),
                                end: new Date(data.thoiGianKetThuc).toISOString().replace(/T.*$/, ''),
                                title: data.tenKeHoach,
                                allDay:true,
                                backgroundColor:"green"
                            })
                        }
                        // else {
                        //     a.push({
                        //         id: data.id,
                        //         start: new Date(data.thoiGianBatDau).toISOString().replace(/T.*$/, ''),
                        //         end: new Date(data.thoiGianKetThuc).toISOString().replace(/T.*$/, ''),
                        //         title: data.tenKeHoach,
                        //         allDay:true,
                        //         backgroundColor:"green",
                        //         daysOfWeek: data.dsNgayThucHienKhoaLuan
                        //     })
                        // }

                    })
                    // this.data$ = a;
                    this.data$ = [{
                        groupId:'999',
                        title:'lala',
                        start:'2023-04-25T16:00:00'
                    },{
                        title: 'Meeting',
                        start:'2023-04-25T06:00:00',
                        end: '2023-04-25T07:00:00'
                    }]
                })
            });

        }
    }


    data$: any[] = [];
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
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
    };
    currentEvents: EventApi[] = [];

    handleCalendarToggle() {
        this.calendarVisible = !this.calendarVisible;
    }

    handleWeekendsToggle() {
        const {calendarOptions} = this;
        calendarOptions.weekends = !calendarOptions.weekends;
    }

    handleDateSelect(selectInfo: DateSelectArg) {
        const title = prompt('Please enter a new title for your event');
        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            console.log("INFO:",selectInfo);
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            });
        }
    }

    handleEventClick(clickInfo: EventClickArg) {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();
        }
    }

    handleEvents(events: EventApi[]) {
        this.currentEvents = events;
        events.forEach((res) => {
            console.log(JSON.stringify(res));
        })
        this.changeDetector.detectChanges();
    }
}

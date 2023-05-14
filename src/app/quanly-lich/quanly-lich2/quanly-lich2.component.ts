import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput} from "@fullcalendar/core";
import {createEventId, INITIAL_EVENTS} from "./event-utils";
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {LichService} from "../../shared-service/lich/lich.service";
import {map, take} from "rxjs";
import {getData} from "ajv/dist/compile/validate";

@Component({
    selector: 'app-quanly-lich2',
    templateUrl: './quanly-lich2.component.html',
    styleUrls: ['./quanly-lich2.component.scss']
})
export class QuanlyLich2Component implements OnInit {
    // const TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
    calendarVisible = true;
    @Input() maHK:string = '';

    constructor(private changeDetector: ChangeDetectorRef, private lichService: LichService) {

    }

    ngOnInit(): void {
        console.log("CHA - CON:", this.maHK);
        this.lichService.getLichTheoHocKyVaMaGV(this.maHK,null,"ROLE_GIANGVIEN").pipe(take(1)).subscribe( res =>{
            let a = [];
                res.forEach(data => {
                    a.push({
                        id: data.id,
                        start: new Date(data.thoiGianBatDau).toISOString(),
                        end: new Date(data.thoiGianKetThuc).toISOString(),
                        title: data.tenKeHoach,
                        allDay:true,
                        backgroundColor:"orange",
                        daysOfWeek: data.dsNgayThucHienKhoaLuan.length>0 ? data.dsNgayThucHienKhoaLuan : null
                    })
                })
            this.data$ = a;
            console.log("$",this.data$);
            }
        );
        // this.lichService.fetchData().pipe(take(1)).subscribe( res =>
        //     this.data$ = res
        // );
    }

    data$: any[] = [ ];
    calendarOptions: CalendarOptions = {
        plugins: [
            interactionPlugin,
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
        ],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth',
        // initialEvents: this.data, // alternatively, use the `events` setting to fetch from a feed
        // initialEvents: INITIAL_EVENTS,
        // eventSources: this.data,
        // events: this.data,
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this)
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

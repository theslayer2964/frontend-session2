import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LichService} from "../../shared-service/lich/lich.service";
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {createEventId} from "../../quanly-lich/quanly-lich2/event-utils";
import {UserAuthService} from "../../authentication/_service/user-auth.service";

@Component({
  selector: 'app-sinhvien-lich',
  templateUrl: './sinhvien-lich.component.html',
  styleUrls: ['./sinhvien-lich.component.scss']
})
export class SinhvienLichComponent implements OnInit {

  calendarVisible = true;
  constructor(private changeDetector: ChangeDetectorRef, private lichService: LichService,
              private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    // let role = this.userAuthService.getRoles();
    // if(role == "ROLE_GIANGVIEN"){
    //   console.log("GV")
    // }
    // else if(role == "ROLE_SINHVIEN"){
    //   console.log("SV")
    // }
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

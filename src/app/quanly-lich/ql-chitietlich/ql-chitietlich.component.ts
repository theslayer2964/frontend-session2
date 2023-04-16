import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ql-chitietlich',
  templateUrl: './ql-chitietlich.component.html',
  styleUrls: ['./ql-chitietlich.component.scss']
})
export class QlChitietlichComponent implements OnInit{
  @Input() keHoach : any;
  id: any;

  ngOnInit(): void {
    console.log("XXX:", JSON.stringify(this.keHoach));
    this.id = JSON.stringify(this.keHoach);
  }
  constructor() {

  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}

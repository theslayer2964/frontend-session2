import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ql-lich',
  templateUrl: './ql-lich.component.html',
  styleUrls: ['./ql-lich.component.scss']
})
export class QlLichComponent implements OnInit {
  page = 2;
  page1 = 3;
  active = 1;
  active1 = 1;
  active2 = 1;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {LichService} from "../../shared-service/lich/lich.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";

@Component({
  selector: 'app-giangvien-container',
  templateUrl: './giangvien-container.component.html',
  styleUrls: ['./giangvien-container.component.scss']
})
export class GiangvienContainerComponent implements OnInit {

  constructor(
      private lichService: LichService,
      private userAuthService: UserAuthService,
              ) { }

  ngOnInit(): void {
  }


}

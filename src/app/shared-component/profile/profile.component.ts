import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../authentication/_service/user-auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {

  }

}

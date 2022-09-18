import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UserService} from "../../../core/services/user-service";
import {UserSession} from "../../../core/models/user.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  loggedUser!: Observable<UserSession>;

  constructor(private userService: UserService) {
    this.loggedUser = this.userService.loggedUser
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logoutUser();
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UserService} from "../../../core/services/user-service";
import {UserSession} from "../../../core/models/user.model";
import {Observable} from "rxjs";
import {AlertService} from "../../../core/services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  loggedUser!: Observable<UserSession>;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
    ) {
    this.loggedUser = this.userService.loggedUser
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logoutUser();
    this.router.navigate(['']).then(
      () => {
        this.alertService.success("Logged out successfully", { autoClose: true, keepAfterRouteChange: true });
      }
    );
  }
}

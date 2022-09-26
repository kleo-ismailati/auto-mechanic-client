import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UserService} from "../../../core/services/user-service";
import {UserSession} from "../../../core/models/user.model";
import {Observable} from "rxjs";
import {AlertService} from "../../../core/services/alert.service";
import {Router} from "@angular/router";
import {NgxSpinner, NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

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
    private router: Router,
    private spinner: NgxSpinnerService
    ) {
    this.loggedUser = this.userService.loggedUser
  }

  ngOnInit(): void {
  }

  logout() {
    this.spinner.show();
    setTimeout(()=> {
        this.userService.logoutUser();
        this.spinner.hide();
        this.router.navigate(['']).then(
          () => {
            this.alertService.success("Logged out successfully", { autoClose: true, keepAfterRouteChange: true });
          })
    }
    ,2000);

  }
}

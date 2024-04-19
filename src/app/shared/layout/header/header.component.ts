import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core'
import { UserService } from '../../../core/services/user-service'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { UserSession } from '../../../features/user-management/models/user-session.model'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
    loggedUser!: Observable<UserSession | null>
    loggedUserSub: any

    constructor(
        private userService: UserService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {
        this.loggedUser = this.userService.loggedUser
    }

    ngOnInit(): void {
        this.userService.autoLogoutUser()
        this.loggedUserSub = this.loggedUser.subscribe((user) => {
            if (user != null) {
                this.userService.clearLogoutTimer()
                this.userService.setLogoutTimer()
            } else this.userService.clearLogoutTimer()
        })
    }

    logout() {
        this.spinner.show().then((r) => r)
        setTimeout(() => {
            this.userService.logoutUser()
            this.spinner.hide().then((r) => r)
        }, 2000)
    }

    ngOnDestroy(): void {
        this.userService.clearLogoutTimer()
        this.loggedUserSub.unsubscribe()
    }
}

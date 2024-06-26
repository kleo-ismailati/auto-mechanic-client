import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | boolean {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['']).then((r) => r);
        }
        return this.userService.isLoggedIn();
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | boolean {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['']).then((r) => r);
        }
        return this.userService.isLoggedIn();
    }
}

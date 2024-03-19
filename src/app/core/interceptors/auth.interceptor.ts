import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {UserService} from "../services/user-service";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        // 'Content-Type' : 'application/json; charset=utf-8',
        'Accept': 'application/json',
      },
    });
    req = !this.userService.getToken() ? req : req.clone({
      setHeaders: {Authorization: `Bearer ${this.userService.getToken()}`}
    });
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.userService.logoutUserForced();
        }
        return throwError(error);
      })
    );
  }
}

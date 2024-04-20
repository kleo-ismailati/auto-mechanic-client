import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { UserLogin } from '../user-management/models/user-login.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserSession } from '../user-management/models/user-session.model';

@Injectable()
export class LoginService {
    constructor(private api: ApiService) {}

    login(user: UserLogin): Observable<UserSession> {
        return this.api.post(environment.auth_url, user);
    }
}

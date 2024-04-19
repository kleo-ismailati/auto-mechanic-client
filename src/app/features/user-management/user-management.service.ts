import { Injectable } from '@angular/core'
import { ApiService } from '../../core/services/api.service'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { User } from './models/user.model'
import { UserUpdate } from './models/user-update.model'
import { UserCreate } from './models/user-create.model'

@Injectable()
export class UserManagementService {
    constructor(private api: ApiService) {}

    getUserList(): Observable<User[]> {
        return this.api.get(environment.users_url)
    }

    getCurrentUser(id: number): Observable<User> {
        return this.api.get(environment.users_url + '/' + id)
    }

    updateUser(id: number, user: UserUpdate): Observable<any> {
        return this.api.put(environment.users_url + '/' + id, user)
    }

    addUser(user: UserCreate): Observable<any> {
        return this.api.post(environment.users_url, user)
    }
}

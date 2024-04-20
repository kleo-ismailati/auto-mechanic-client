import { Component, Input } from '@angular/core';
import { UserSession } from '../../models/user-session.model';

@Component({
    selector: 'app-current-user',
    templateUrl: './current-user.component.html',
    styleUrls: ['./current-user.component.css'],
})
export class CurrentUserComponent {
    @Input() loggedUser!: UserSession;
}

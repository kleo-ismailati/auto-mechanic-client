import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { User } from '../../models/user.model'
import { UserUpdate } from '../../models/user-update.model'

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
    @Input() user!: User
    @Output() updatingUser = new EventEmitter<UserUpdate | null>()

    isEdit: boolean = false
    updatedUser!: UserUpdate

    newPassword: string = ''
    addNewPassword: boolean = false

    ngOnInit(): void {
        this.addNewPassword = false
        this.isEdit = false
        this.newPassword = ''
    }

    enableEdit() {
        this.updatedUser = {
            email: this.user.email,
            username: this.user.username,
        }
        this.isEdit = true
    }

    updateUser() {
        if (this.newPassword != '') {
            this.updatedUser.password = this.newPassword
        }
        this.updatingUser.emit(this.updatedUser)
        this.ngOnInit()
    }

    cancelUpdate() {
        this.updatingUser.emit(null)
        this.ngOnInit()
    }
}

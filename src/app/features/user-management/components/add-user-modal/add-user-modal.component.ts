import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms'
import { UserCreate } from '../../models/user-create.model'

@Component({
    selector: 'app-add-user-modal',
    templateUrl: './add-user-modal.component.html',
    styleUrls: ['./add-user-modal.component.css'],
})
export class AddUserModalComponent implements OnInit {
    @Output() addUser = new EventEmitter<UserCreate | null>()

    newUserForm: FormGroup
    newUser: UserCreate = { email: '', username: '', password: '' }

    constructor(private formBuilder: FormBuilder) {
        this.newUserForm = this.formBuilder.group({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15),
            ]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        })
    }

    ngOnInit(): void {
        this.newUser = { email: '', username: '', password: '' }
        this.newUserForm.reset()
    }

    get f(): { [key: string]: AbstractControl } {
        return this.newUserForm.controls
    }

    cancelAddNewUser() {
        this.newUser = { email: '', username: '', password: '' }
        this.addUser.emit(null)
    }

    addNewUser() {
        this.newUser = {
            username: this.newUserForm.value['username'],
            email: this.newUserForm.value['email'],
            password: this.newUserForm.value['password'],
        }
        this.addUser.emit(this.newUser)
        this.ngOnInit()
    }
}

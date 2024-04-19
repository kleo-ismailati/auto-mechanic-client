import { NgModule } from '@angular/core'
import { UserListComponent } from './components/user-list/user-list.component'
import { UserManagementRoutingModule } from './user-management-routing.module'
import { SharedModule } from '../../shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component'
import { UserManagementPageComponent } from './pages/user-management-page/user-management-page.component'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { UserManagementService } from './user-management.service'
import { UserFormComponent } from './components/user-form/user-form.component'
import { EditUserModalComponent } from './components/edit-user-modal/edit-user-modal.component'
import { CurrentUserComponent } from './components/current-user/current-user.component'
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component'

@NgModule({
    declarations: [
        UserListComponent,
        UserDetailsPageComponent,
        UserManagementPageComponent,
        UserFormComponent,
        EditUserModalComponent,
        CurrentUserComponent,
        AddUserModalComponent,
    ],
    imports: [
        UserManagementRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        SharedModule,
        TableModule,
    ],
    providers: [UserManagementService],
})
export class UserManagementModule {}

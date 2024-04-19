import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClientManagementPageComponent } from './pages/client-management-page/client-management-page.component'
import { ClientDetailsPageComponent } from './pages/client-details-page/client-details-page.component'
import { AutoDetailsPageComponent } from './pages/auto-details-page/auto-details-page.component'

const routes: Routes = [
    { path: '', component: ClientManagementPageComponent },
    { path: ':id', component: ClientDetailsPageComponent },
    { path: ':id/autos/:autoId', component: AutoDetailsPageComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientManagementRoutingModule {}

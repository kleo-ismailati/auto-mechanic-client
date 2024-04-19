import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { AlertService } from './services/alert.service'
import { ApiService } from './services/api.service'
import { UserService } from './services/user-service'
import { HelperService } from './utilities/helper.service'

@NgModule({
    imports: [HttpClientModule],
    providers: [AlertService, ApiService, UserService, HelperService],
})
export class CoreModule {}

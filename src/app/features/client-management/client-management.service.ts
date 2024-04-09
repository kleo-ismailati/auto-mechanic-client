import {Injectable} from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {Observable} from "rxjs";
import {Auto} from "./models/auto.model";
import {environment} from "../../../environments/environment";
import {HttpHeaders} from "@angular/common/http";
import {BookingCreate} from "../booking-management/models/booking-create.model";
import {Client} from "./models/client.model";
import {PagedResponse} from "../../core/models/paged.response.model";
import {ClientCreate} from "./models/client-create.model";
import {AutoCreate} from "./models/auto-create.model";

@Injectable()
export class ClientManagementService {

  constructor(private api: ApiService) {
  }

  getClient(id: number): Observable<Client> {
    return this.api.get(environment.clients_url + '/' + id);
  }

  getClientList(): Observable<PagedResponse<Client>> {
    return this.api.get(environment.clients_url);
  }

  getClientPage(page: number): Observable<PagedResponse<Client>> {
    return this.api.get(`${environment.clients_url}?page=${page}`);
  }

  addClient(client: ClientCreate): Observable<any> {
    return this.api.post(environment.clients_url, client);
  }

  editClient(id: number, client: Client): Observable<any> {
    return this.api.put(environment.clients_url + '/' + id, client);
  }

  getAuto(autoId: number): Observable<Auto> {
    return this.api.get(environment.autos_url + '/' + autoId);
  }

  addAuto(id: number, auto: AutoCreate): Observable<any> {
    return this.api.post(`${environment.clients_url}/${id}${environment.add_auto_url}`, auto);
  }

  updateAuto(autoId: number, auto: Auto): Observable<any> {
    return this.api.put(environment.autos_url + '/' + autoId, auto);
  }

  createBooking(booking: BookingCreate): Observable<any> {
    return this.api.post(environment.bookings_url, booking);
  }

  getImage(imageId: number, headers: HttpHeaders): Observable<Blob> {
    return this.api.getBlob(environment.images_url + '/' + imageId, undefined, headers);
  }

  setImageForAuto(autoId: number, formData: FormData): Observable<any> {
    return this.api.post(environment.auto_images_url + '/' + autoId, formData);
  }
}

import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

import { catchError } from 'rxjs/operators'

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {}

    private formatErrors(error: any) {
        return throwError(() => error.error)
    }

    get(
        path: string,
        params: HttpParams = new HttpParams(),
        headers: HttpHeaders = new HttpHeaders()
    ): Observable<any> {
        return this.http
            .get(`${environment.api_url}${path}`, { params, headers })
            .pipe(catchError(this.formatErrors))
    }

    getBlob(
        path: string,
        params: HttpParams = new HttpParams(),
        headers: HttpHeaders = new HttpHeaders()
    ): Observable<any> {
        return this.http
            .get(`${environment.api_url}${path}`, {
                params,
                headers,
                responseType: 'blob',
            })
            .pipe(catchError(this.formatErrors))
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http
            .put(`${environment.api_url}${path}`, body)
            .pipe(catchError(this.formatErrors))
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http
            .post(`${environment.api_url}${path}`, body)
            .pipe(catchError(this.formatErrors))
    }

    delete(path: any): Observable<any> {
        return this.http
            .delete(`${environment.api_url}${path}`)
            .pipe(catchError(this.formatErrors))
    }
}

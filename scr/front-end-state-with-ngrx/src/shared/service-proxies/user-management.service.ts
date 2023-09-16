import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL, BaseService } from './base.service';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { IUser, User } from '../models/user-dto';
import { CreateUserInputDto } from '../models/create-user-input-dto';

@Injectable()
export class UserManagementServiceProxy extends BaseService {

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        super(http, baseUrl);
    }

    addUser(user: CreateUserInputDto): Observable<any> {
        let _headers: HttpHeaders = new HttpHeaders({
            'accept': 'text/plain',
            'content-type': 'application/json'
        });

        return this.http.post<any>(this.baseUrl + '/api/User/Add', user, { headers: _headers })
            .pipe(map(result => {
                return result;
            }), catchError((err: HttpErrorResponse) => {
                return throwError(() => err);
            }));
    }

    getAllUsers(): Observable<any> {
        let _headers: HttpHeaders = new HttpHeaders({
            'accept': 'text/plain',
            'content-type': 'application/json'
        });

        return this.http.get<any>(this.baseUrl + '/api/User/GetAll', { headers: _headers })
            .pipe(map((result: any) => {
                return result;
            }), catchError((err: HttpErrorResponse) => {
                return throwError(() => err);
            }));
    }

    deleteUser(userId: number): Observable<any> {
        let _headers: HttpHeaders = new HttpHeaders({
            'accept': 'text/plain',
            'content-type': 'application/json'
        });

        return this.http.delete<any>(this.baseUrl + '/api/User/delete?userId=' + userId, { headers: _headers })
            .pipe(map(result => {
                return result;
            }), catchError((err: HttpErrorResponse) => {
                return throwError(() => err);
            }));
    }



}


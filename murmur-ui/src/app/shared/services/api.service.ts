import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // TODO: load from appsettings.json
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  getUsers$(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API_URL}/users`).pipe(
      tap(res => console.log('Fetched Users: ', res))
    );
  }
}

import { Injectable } from '@angular/core';
import { User } from '../../models/User.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'localhost:3000';

  constructor(private http: HttpClient) {}

  signUp(newUser: User): Observable<void> {
    console.log('newUSer', newUser);
    return this.http.post<void>('http://localhost:3000/register', newUser);
  }
}

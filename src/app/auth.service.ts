import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  user: any; // Adjust according to your user model
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:5000/api/auth/';
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(
    type: string,
    username: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.api}login`, { type, username, password })
      .pipe(
        tap((response) => {
          this.storeUser(response.user, response.token);
        })
      );
  }

  register(
    type: string,
    customerData: {
      username: string;
      password: string;
      firstName: string;
      lastName: string;
    }
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.api}signup`, { type, ...customerData })
      .pipe(
        tap((response) => {
          this.storeUser(response.user, response.token);
        })
      );
  }

  private storeUser(user: any, token: string) {
    localStorage.setItem('token', token);
    this.userSubject.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

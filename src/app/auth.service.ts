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
  private api = 'http://localhost:3000/api/auth/';
  private userSubject: BehaviorSubject<any>;
  public user$: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    // Initialize BehaviorSubject with the current user (if exists in localStorage)
    const storedUserJson = localStorage.getItem('user');
    let storedUser = null;
    try {
      storedUser = storedUserJson ? JSON.parse(storedUserJson) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
      storedUser = null;
    }
    this.userSubject = new BehaviorSubject(storedUser);
    this.user$ = this.userSubject.asObservable();
  }

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
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
